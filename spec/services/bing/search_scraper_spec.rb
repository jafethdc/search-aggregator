require 'rails_helper'

RSpec.describe Bing::SearchScraper do
  subject { described_class.new('kendrick lamar').run }

  let(:fixture) do
    File.read(Rails.root + 'spec/support/fixtures/bing_search.htm')
  end

  describe '#run' do
    it 'makes a GET request to bing with the right params' do
      expect(HTTParty).to receive(:get).with(
        Bing::SearchScraper::BASE_URL,
        hash_including(query: { q: 'kendrick lamar', first: 10 })
      ).and_return(fixture)

      subject
    end

    it 'returns an array of results' do
      allow(HTTParty).to receive(:get).and_return(fixture)

      results = subject

      expect(results.size).to eq(10)
      results.each do |result|
        expect(result).to include(:url, :title, :description)
      end
      expect(results.first).to include(
        url: 'https://twitter.com/kendricklamar',
        title: 'Kendrick Lamar (@kendricklamar) • Twitter',
        description:
          'Aquí nos gustaría mostrarte una descripción, pero el sitio web que estás mirando no lo permite.'
      )
    end
  end
end
