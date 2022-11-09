Rails.application.routes.draw do
  namespace 'api', path: '/api/' do
    resources :reports
    resources :users
    resources :locations
    resources :categories
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#delete'
    get '/authorized_user', to: 'users#show'
    get '/categories/:id/reports', to: 'categories#reports'
  end
end
