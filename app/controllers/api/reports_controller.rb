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

    def notes
      @report = Report.find(params[:id])
      @notes = @report.notes
      render json: @notes
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
      @report.title = task_params[:title]
      @report.description = task_params[:description]
      @report.location = Location.find(task_params[:location_id])
      @report.category = Category.find(task_params[:category_id])
      body = "#{@current_user.username} Clarified Report."
      if @report.title_changed?
        body += " Changed title from #{@report.title_was.inspect} to #{@report.title.inspect}."
      end
      if @report.description_changed?
        body += " Changed description from #{@report.description_was.inspect} to #{@report.description.inspect}."
      end
      if @report.location_id_changed?
        body += " Changed location from #{Location.find(@report.location_id_was).name.inspect} to #{Location.find(@report.location_id).name.inspect}."
      end
      if @report.category_id_changed?
        body += " Changed category from #{Category.find(@report.category_id_was).name.inspect} to #{Category.find(@report.category_id).name.inspect}."
      end
      
      if @report.save
        n = Note.new(user_id: @current_user.id, report_id: @report.id)
        n.task = 'Clarify'
        n.body = body
        n.save!
        render json: @report
      else
        render json: { error: 'Clarify Report Error', errors: @report.errors }, status: :unprocessable_entity
      end
    end

    def revert
      @report = Report.find(params[:id])
      body = "#{@current_user.username} reverted report."
      @report.status = 'pending_corrective_action'
      if @report.status_changed?
        body += " Reverted status from #{@report.status_was.inspect} to #{@report.status.inspect}."
      end
      if @report.save
        n = Note.new(user_id: @current_user.id, report_id: @report.id)
        n.task = 'Reverted'
        n.body = body
        n.save!
        render json: @report
      else
        render json: { error: 'Revert Report Error', errors: @report.errors }, status: :unprocessable_entity
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
      @report.corrective_action = task_params[:corrective_action]
      body = "#{@current_user.username} recorded corrective action."
      @report.status = 'pending_final_action'
      if @report.corrective_action_changed?
        if @report.corrective_action_was.nil?
          body += " Set corrective action to #{@report.corrective_action.inspect}."
        else
          body += " Changed corrective action from #{@report.corrective_action_was.inspect} to #{@report.corrective_action.inspect}."
        end
      end
      if @report.status_changed?
        body += " Changed status from #{@report.status_was.inspect} to #{@report.status.inspect}."
      end
      if (task_params[:corrective_action].blank?)
        render json: { error: 'Record Corrective Action Error', errors: { 'Corrective Action': "Can't be blank" }
        }, status: :unprocessable_entity
        return 
      end
      
      if @report.save
        n = Note.new(user_id: @current_user.id, report_id: @report.id)
        n.task = 'Recorded Corrective Action'
        n.body = body
        n.save!
        render json: @report
      else
        render json: { error: 'Error', errors: @report.errors }, status: :unprocessable_entity
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
