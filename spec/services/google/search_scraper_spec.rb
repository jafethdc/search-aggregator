require 'rails_helper'

RSpec.describe Google::SearchScraper do
  subject { described_class.new('kendrick lamar').run }

  let(:fixture) do
    File.read(Rails.root + 'spec/support/fixtures/google_search.htm')
  end

  describe '#run' do
    it 'makes a GET request to bing with the right params' do
      expect(HTTParty).to receive(:get).with(
        Google::SearchScraper::BASE_URL,
        hash_including(query: { q: 'kendrick lamar', start: 10 })
      ).and_return(fixture)

      subject
    end

    it 'returns an array of results' do
      allow(HTTParty).to receive(:get).and_return(fixture)

      results = subject
      expect(results.size).to eq(9)
      results.each do |result|
        expect(result).to include(:url, :title, :description)
      end
      expect(results.first).to include(
        url: 'https://www.youtube.com/watch?v=DX2pF_aonRQ',
        title: 'LA HISTORIA DE KENDRICK LAMAR - YouTube',
        description:
          'SUSCRÍBETE! En este video hacemos un repaso entre los álbumes y la carrera de Kendrick Lamar, quizá el ...'
      )
    end
  end
end
