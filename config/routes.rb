Rails.application.routes.draw do
  namespace :api do
    resource :search, only: :show
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
