const express = require('express');
const { uuid, isUuid } = require('uuidv4')

const app = express();

app.use(express.json());

/* 
Métodos HTTP:

GET: Buscar informações
POST: criar uma informação no back-end
PUT/PATCH: Alterar uma informação no back-end
DELETE: Deletar uma informação no back-end

Tipos de parâmetros:

Query Parans: Filtros e paginação
Routes Parans: Identificar recursos (Atualizar/Deletar)
Request Body: Conteúdo na hora criar ou editar um recurso (JSON)

Middleware:

Interceptador de requisições que interrompe totalmente a requisição ou alterear dados da requisição.
*/

const projects = [];

function logRequest(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}]  ${url}`;

    console.time(logLabel)
    
    next();
    console.timeEnd(logLabel)
}

function validateProject(request, response, next) {
        const { id } = request.params

        if (!isUuid(id)){
            return response.status(400).json({ erro: 'Invalid project ID.'})
        }
}

app.use(logRequest)

app.get('/projects', (request, response) => {
    // const { title, owner } = request.query

    // console.log(title)
    // console.log(owner)

    return response.json(projects);
});

// aqui (passo 3)

// 1 - 2

app.post('/projects', (request, response) =>{
    const {title, owner} = request.body
    
    const project = { id:uuid(), title, owner}

    projects.push(project);

    return response.json(project)
})

app.put('/projects/:id', (request, response) =>{
    const { id } = request.params
    
    const projectIndex = projects.findIndex(project => project.id == id);
    if(projectIndex < 0){
        return response.status(400).json({ error:'Project not found'})
    }
    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (request, response) =>{
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);
    
    if(projectIndex < 0){
        return response.status(400).json({ error:'Project not found.' })
    }
    projects.splice(projectIndex, 1);

    return response.status(204).send()
    });

app.listen(3333, () => {
    console.log('🚀 Back-end started!')
});

