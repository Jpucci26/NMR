module Api
  class CategoriesController < ApplicationController
    before_action :set_category, only: %i[show update destroy reports]

    # GET /categories
    def index
      @categories = Category.all.reorder(name: :asc)

      render json: @categories
    end

    # GET /categories/1/reports
    def reports
      @reports = @category.reports
      render json: @reports
    end

    # GET /categories/1
    def show
      render json: @category
    end

    # POST /categories
    def create
      @category = Category.new(category_params)

      if @category.save
        render json: @category, status: :created, location: [:api, @category]
      else
        render json: { error: 'Create Category Error', errors: @category.errors }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /categories/1
    def update
      if @category.update(category_params)
        render json: @category
      else
        render json: { error: 'Update Category Error', errors: @category.errors }, status: :unprocessable_entity
      end
    end

    # DELETE /categories/1
    def destroy
      @category.destroy
      render json: @category
    rescue StandardError => e
      render json: { error: e.message }
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name, :description, :status, :user_id)
    end
  end
end
