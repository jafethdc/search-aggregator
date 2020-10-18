Rails.application.routes.draw do
  root 'homepage#index'
  get '/search' => 'homepage#search'
end
