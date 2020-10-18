module Api
  class SearchesController < ApplicationController
    ENGINE_TO_SERVICE = {
      google: Google::SearchScrapper, bing: Bing::SearchScrapper
    }.with_indifferent_access.freeze

    ENGINE_OPTIONS = %w[google bing both].freeze

    def show
      text, engine = params.values_at(:text, :engine)

      unless text
        render json: { error: 'Empty text' }, status: :unprocessable_entity
      end

      search_scrapper = ENGINE_TO_SERVICE[engine]

      unless search_scrapper
        render json: { error: 'Invalid engine' }, status: :unprocessable_entity
      end

      render json: search_scrapper.new(text).run, status: :ok
    end
  end
end
