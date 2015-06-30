TrelloClone::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:create, :update, :destroy] do
      patch 'update_order', :on => :collection
    end
    resources :cards, only: [:index, :create, :update, :destroy] do
      patch 'update_order', :on => :collection
    end

    # resources :items
    # resources :board_memberships
    # resources :card_assignments
  end
end
