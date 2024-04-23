require 'rails_helper'

RSpec.describe "Tasks API", type: :request do
  # Inicializa o conjunto de tarefas com algumas tarefas de teste
  let!(:tasks) { create_list(:task, 3) }
  let(:task_id) { tasks.first.id }

  # Testa o endpoint GET /tasks
  describe "GET /tasks" do
    before { get '/tasks' }

    it "retorna todas as tarefas" do
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)).not_to be_empty
    end

    it "retorna o status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  # Testa o endpoint GET /tasks/:id
  describe "GET /tasks/:id" do
    before { get "/tasks/#{task_id}" }

    context "quando a tarefa existe" do
      it "retorna a tarefa" do
        json_response = JSON.parse(response.body)
        expect(json_response).not_to be_empty
        expect(json_response['id']).to eq(task_id)
      end

      it "retorna o status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "quando a tarefa não existe" do
      let(:task_id) { 500 }

      it "retorna o status code 404" do
        expect(response).to have_http_status(404)
      end

      it "retorna uma mensagem 'Tarefa não encontrada'" do
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Tarefa não encontrada')
      end
    end
  end

  # Testa o endpoint POST /tasks
  describe "POST /tasks" do
    let(:valid_attributes) { { task: { title: 'Nova Tarefa' } } }

    context "quando os atributos são válidos" do
      before { post '/tasks', params: valid_attributes }

      it "cria uma tarefa" do
        expect(JSON.parse(response.body)['title']).to eq('Nova Tarefa')
      end

      it "retorna o status code 201" do
        expect(response).to have_http_status(201)
      end
    end

    context "quando os atributos são inválidos" do
      before { post '/tasks', params: { task: { title: nil } } }

      it "retorna o status code 422" do
        expect(response).to have_http_status(422)
      end

      it "retorna uma mensagem de erro" do
        expect(JSON.parse(response.body)['errors']['title']).to include("não pode ficar em branco")
      end
    end
  end

  # Testa o endpoint PUT /tasks/:id
  describe "PUT /tasks/:id" do
    let(:valid_attributes) { { task: { title: 'Tarefa Atualizada' } } }

    context "quando a tarefa existe" do
      before { put "/tasks/#{task_id}", params: valid_attributes }

      it "atualiza a tarefa" do
        json_response = JSON.parse(response.body)
        expect(json_response['title']).to eq('Tarefa Atualizada')
      end

      it "retorna o status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  # Testa o endpoint DELETE /tasks/:id
  describe "DELETE /tasks/:id" do
    before { delete "/tasks/#{task_id}" }

    it "retorna o status code 204" do
      expect(response).to have_http_status(204)
    end
  end
end