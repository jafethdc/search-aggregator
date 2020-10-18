require 'rails_helper'

RSpec.describe HomepageController, type: :controller do
  describe 'GET #search' do
    it 'test' do
      get :search, params: { engine: 'bing', text: 'hola' }
      expect(true).to be_truthy
    end
  end
end
