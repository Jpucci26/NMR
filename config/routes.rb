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
    get '/locations/:id/reports', to: 'locations#reports'
    post '/reports/:id/clarify', to: 'reports#clarify'
    get '/reports/:id/notes', to: 'reports#notes'
    post '/reports/:id/record_corrective_action', to: 'reports#record_corrective_action'
    post '/reports/:id/revert', to: 'reports#revert'
    post '/reports/:id/close', to: 'reports#close'
    post '/reports/:id/comment', to: 'reports#comment'
  end
end
