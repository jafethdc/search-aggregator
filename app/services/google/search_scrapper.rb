module Google
  class SearchScrapper
    # BASE_URL = 'https://www.google.com/search?q=jejejeje&start=30'.freeze
    BASE_URL = 'https://www.google.com/search'.freeze
    PAGE_SIZE = 10
    DESKTOP_USER_AGENT =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0'
        .freeze

    def initialize(term, page = 1)
      @term = term
      @page = page
    end

    def run
      document = load_document
      result_items = document.css("#rso > [class='g'] .rc")
      result_items.map do |result|
        header, body = result.children
        link = header.css('a').first
        title = link.css('h3 span').first
        description = body.css('span').first
        OpenStruct.new(
          url: link.attributes['href'].value,
          title: title.text,
          description: description.text
        )
      end
    end

    private

    def load_document
      offset = @page * PAGE_SIZE
      url = "#{BASE_URL}?q=#{@term}&start=#{offset}"
      html = HTTParty.get(url, headers: { 'User-Agent' => DESKTOP_USER_AGENT })
      Nokogiri.HTML(html)
    end
  end
end
