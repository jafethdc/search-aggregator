require 'rails_helper'

RSpec.describe Api::SearchesController, type: :controller do
  describe 'GET #show' do
    let(:parsed_response) { JSON.parse(response.body) }

    context 'when no text is passed' do
      it 'returns unprocessable entity state' do
        get :show, params: { text: '', engine: 'google' }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns an error' do
        get :show, params: { text: '', engine: 'google' }
        expect(parsed_response['error']).to eq('Empty text')
      end
    end

    context 'when no valid engine is passed' do
      it 'returns unprocessable entity state' do
        get :show, params: { text: '', engine: 'youtube' }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns an error' do
        get :show, params: { text: '', engine: 'youtube' }
        expect(parsed_response['error']).to eq('Invalid engine')
      end
    end

    context 'when valid text and engine are passed' do
      it 'returns ok state' do
        allow(Google::SearchScraper).to receive(:run).and_return([])
        get :show, params: { text: 'kendrick', engine: 'google' }
        expect(response).to have_http_status(:ok)
      end

      context 'when engine is not both' do
        it 'calls the right scraper' do
          expect(Google::SearchScraper).to receive(:run).with('kendrick')
            .and_return([])
          get :show, params: { text: 'kendrick', engine: 'google' }
        end

        it 'returns the scraped results' do
          allow(Google::SearchScraper).to receive(:run).and_return(
            [
              {
                title: 'Kendrick Lamar | Official Site',
                url: 'http://www.kendricklamar.com/',
                description:
                  'Featuring photos from the legendary Annie Leibovitz, Kendrick Lamar is the cover story of this....'
              }
            ]
          )
          get :show, params: { text: 'kendrick', engine: 'google' }
          expect(parsed_response.size).to eq(1)
          expect(parsed_response.first).to include(
            'title' => 'Kendrick Lamar | Official Site',
            'url' => 'http://www.kendricklamar.com/',
            'description' =>
              'Featuring photos from the legendary Annie Leibovitz, Kendrick Lamar is the cover story of this....'
          )
        end
      end

      context 'when engine is both' do
        it 'calls both scrapers' do
          expect(Google::SearchScraper).to receive(:run).with('kendrick')
            .and_return([])
          expect(Bing::SearchScraper).to receive(:run).with('kendrick')
            .and_return([])
          get :show, params: { text: 'kendrick', engine: 'both' }
        end

        it 'merges the results from both engines' do
          allow(Google::SearchScraper).to receive(:run).and_return(
            [
              {
                title: 'Kendrick Lamar | Official Site',
                url: 'http://www.kendricklamar.com/',
                description:
                  'Featuring photos from the legendary Annie Leibovitz, Kendrick Lamar is the cover story of this....'
              }
            ]
          )
          allow(Bing::SearchScraper).to receive(:run).and_return(
            [
              {
                title: 'Kendrick Lamar - Wikipedia',
                url: 'https://en.wikipedia.org/wiki/Kendrick_Lamar/',
                description:
                  'Lamar in May 2018. Born. Kendrick Lamar Duckworth. June 17, 1987. Compton, California, U.S.'
              }
            ]
          )
          get :show, params: { text: 'kendrick', engine: 'both' }
          expect(parsed_response.size).to eq(2)
        end
      end
    end
  end
end
