module Api
  class ReportsController < ApplicationController
    before_action :set_report, only: %i[show update destroy]

    # GET /reports
    def index
      @reports = Report.all.includes(:user, :location, :category)
      render json: @reports
    end

    # GET /reports/1
    def show
      render json: @report
    end

    # POST /reports
    def create
      @report = Report.new(report_params)
      @report.user_id = @current_user.id
      if @report.save
        render json: @report, status: :created, location: [:api, @report]
      else
        render json: { error: 'Create Report Error', errors: @report.errors }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /reports/1
    def update
      @report = Report.find(params[:id])
      if @report.update(report_params)
        render json: @report
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    def clarify
      task_params = params.require(:report).permit(:title, :description, :location_id, :category_id)
      @report = Report.find(params[:id])
      if @report.update(task_params)
        render json: @report
      else
        render json: { error: 'Clarify Report Error', errors: @report.errors }, status: :unprocessable_entity
      end
    end

    def revert
      task_params = params.require(:report).permit(:status)
      @report = Report.find(params[:id])
      if @report.update(task_params)
        render json: @report
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    def close
      task_params = params.require(:report).permit(:final_action)
      @report = Report.find(params[:id])
      if @report.update(task_params)
        render json: @report
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    def record_corrective_action
      task_params = params.require(:report).permit(:corrective_action)
      @report = Report.find(params[:id])
      if @report.update(task_params)
        render json: @report
      else
        render json: @report.errors, status: :unprocessable_entity
      end
    end

    # DELETE /reports/1
    def destroy
      @report.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_report
      @report = Report.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def report_params
      params.require(:report).permit(:title, :description, :location_id, :category_id, :status)
    end
  end
end
