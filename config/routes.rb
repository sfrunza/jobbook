Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions", passwords: "passwords" }

  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :user_jobs
        get "/available_months", :to => "user_jobs#available_months", as: "available_months"
        get "/filtered_jobs", :to => "user_jobs#filtered_jobs", as: "filtered_jobs"
      end

      get "/available_users", :to => "users#available_users", as: "available_users"
      get "/filter_users", :to => "users#filter_users", as: "filter_users"
      get "/find_job", :to => "jobs#find_job", as: "find_job"
      post "/reset", :to => "users#reset", as: "reset"
    end
  end

  get "*path", to: "application#fallback_index_html", constraints: ->(request) do
                 !request.xhr? && request.format.html?
               end
end
