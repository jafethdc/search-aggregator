module Api
  class SearchesController < ApplicationController
    ENGINE_TO_SCRAPER = {
      google: Google::SearchScraper, bing: Bing::SearchScraper
    }.with_indifferent_access.freeze

    ENGINE_OPTIONS = [*ENGINE_TO_SCRAPER.keys, 'both'].freeze

    def show
      text, engine = params.values_at(:text, :engine)

      param_error = 'Empty text' if text.blank?
      unless ENGINE_OPTIONS.include? engine.downcase
        param_error = 'Invalid engine'
      end

      if param_error
        render json: { error: param_error }, status: :unprocessable_entity and
          return
      end

      render json: aggregated_search(engine.downcase, text), status: :ok
    end

    private

    def aggregated_search(engine_option, text)
      engines =
        engine_option == 'both' ? ENGINE_TO_SCRAPER.keys : [engine_option]
      results =
        engines.map do |engine|
          scraper = ENGINE_TO_SCRAPER[engine]
          scraper.run(text)
        end.flatten

      results.uniq { |result| result[:url] }.shuffle
    end
  end
end
