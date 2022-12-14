module Api
  class LocationsController < ApplicationController
    before_action :set_location, only: %i[show update destroy reports]

    # GET /locations
    def index
      @locations = Location.all

      render json: @locations
    end

    # GET /locations/1
    def show
      render json: @location
    end

    def reports
      @reports = @location.reports
      render json: @reports
    end

    # POST /locations
    def create
      @location = Location.new(location_params)

      if @location.save
        render json: @location, status: :created, location: [:api, @location]
      else
        render json: { error: 'Create Location Error', errors: @location.errors }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /locations/1
    def update
      if @location.update(location_params)
        render json: @location
      else
        render json: @location.errors, status: :unprocessable_entity
      end
    end

    # DELETE /locations/1
    def destroy
      @location.destroy
      render json: @location
    rescue StandardError => e
      render json: { error: e.message }
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def location_params
      params.require(:location).permit(:name)
    end
  end
end
