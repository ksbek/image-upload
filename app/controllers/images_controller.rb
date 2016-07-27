class ImagesController < ApplicationController

  skip_before_action :verify_authenticity_token 
  def index
    @images = Image.all
    render :index
  end

  # Get Pushed Image
  def get_image
    @image = Image.where("status = 'pushed'").order('updated_at DESC').limit(1)
    redner :show
  end

  def update
    @image = Image.find(params[:id])
    @image.updated_at = Time.now
    if @image
      if @image.update_attributes image_params
        render :show
      else
        render json: @image.errors, status: :unprocessable_entity
      end
    else
      head :not_found
    end
  end

  def destroy
    @image = Image.find(params[:id])
    if @image.destroy
      head :no_content
    else
      render json: {__errors: @image.errors}, status: :unprocessable_entity
    end
  end

  def create
    @image = Image.new image_params
    if @image.save
      render :show, status: :created
    else
      render json: @date.errors, status: :unprocessable_entity
    end
  end


  private
  def image_params
    params.permit(
      :status, :avatar
    )
  end
end
