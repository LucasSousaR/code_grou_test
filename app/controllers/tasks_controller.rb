class TasksController < ApplicationController
  before_action :set_task, only: [:update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /tasks
  def index
    @tasks = Task.all
    render json: @tasks.to_json
  end

  def show
    begin
      @task = Task.find(params[:id])
      render json: @task.to_json
    rescue StandardError => e
      render json: { message: "Tarefa não encontrada" }, status: :not_found
    end
  end
  # POST /tasks
  def create
    if task_params[:title] != ""
      @task = Task.new
      @task.title = task_params[:title]

      if @task.save
        render json: @task.to_json, status: :created
      else
        render json: { errors: @task.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Campo title vazio " }, status: :unprocessable_entity
    end

  end

  # PUT /tasks/:id
  def update
    begin
      @task.update(task_params)
      render json: @task.to_json
    rescue StandardError => e
      render json: { message: "Tarefa não atualizada" }, status: :forbidden
    end
  end

  # DELETE /tasks/:id
  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title)
  end
end
