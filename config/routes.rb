Rails.application.routes.draw do
  namespace 'api', path: '/api/' do
    resources :notes
    resources :reports
    resources :users
    resources :locations
    resources :categories
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#delete'
    get '/current_user', to: 'users#show_current_user'
    get '/categories/:id/reports', to: 'categories#reports'
    post '/reports/:id/clarify', to: 'reports#clarify'
    get '/reports/:id/notes', to: 'reports#notes'
  end
end
