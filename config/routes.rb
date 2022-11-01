Rails.application.routes.draw do
  resources :reports
  resources :users
  resources :locations
  resources :categories
  get '/hello', to: 'application#hello_world'

end
