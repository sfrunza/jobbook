Rails.application.routes.draw do
  root "static_pages#index"
  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions" }

  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end

  namespace :api do
    namespace :v1 do
      resources :users do
        get "/user-jobs", :to => "users#user_jobs", as: "user-jobs"
      end
      resources :jobs
      get "/filter-users", :to => "users#filter_users", as: "filter-users"
      post "/reset", :to => "users#reset", as: "reset"
    end
  end
end
