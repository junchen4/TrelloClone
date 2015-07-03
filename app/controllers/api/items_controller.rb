# require 'byebug'
module Api
  class ItemsController < ApiController
	def create
      @item = Item.new(item_params)

      if @item.save
        render json: @item
      else
        render json: @item.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @item = Item.find(params[:id])
      @item.try(:destroy)
      render json: {}
    end

    def index
    end

    def update
      @item = Item.find(params[:id])
      if @item.update_attributes(item_params)
      	render json: @item
      else
        render json: @item.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def item_params
    	params.require(:item).permit(:title, :card_id, :done)
    end
  end
end
