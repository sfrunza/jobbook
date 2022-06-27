Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations", sessions: "sessions" }

  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end

  namespace :api do
    namespace :v1 do
      resources :users do
        get "/user-jobs", :to => "users#user_jobs", as: "user-jobs"
        get "/selected-month-users", :to => "users#selected_month_users", as: "selected-month-users"
      end
      resources :jobs
      get "/filter-users", :to => "users#filter_users", as: "filter-users"
      post "/reset", :to => "users#reset", as: "reset"
      get "/selected-month", :to => "jobs#selected_month", as: "selected_month"
    end
  end

  get "*path", to: "application#fallback_index_html", constraints: ->(request) do
                 !request.xhr? && request.format.html?
               end
end
