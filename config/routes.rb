TrelloClone::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users do
    get 'find_by_email', :on => :collection
  end
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :destroy] do
      patch 'update_order', :on => :collection
    end
    resources :cards, only: [:index, :create, :update, :destroy] do
      patch 'update_order', :on => :collection
    end

    resources :items, only: [:index, :create, :update, :destroy]
    resources :board_memberships, only: :create do 
      delete 'destroy', :on => :collection
    end
    # resources :card_assignments
  end
end
