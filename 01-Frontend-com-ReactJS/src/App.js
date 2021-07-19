import React, { useState, useEffect } from 'react'

import Header from './components/Header';

import './App.css'

import api from './services/api'

function App(){
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        api.get('projects').then(
            response => {
             console.log(response)   
            }
        )
    }, [])
    
//useState retorna um array com 2 posições
//
// 1. Variavel com seu valor inicial
// 2. Função para atualizarmos esse valor

    function handleAddProject() {
        //projects.push(`Novo projeto ${Date.now()}`)
    
    api.post('projects', {
        title: `novo Projeto ${Date.now()}`,
        owener: "Marco Tulio"
    })
    const project = response.data

    setProjects([... projects, project])
    }

    return (
        <>
        <Header title="Projects"/>
        <ul>
            {projects.map( project =><li key={project.id}>{project.title}</li>)}
        </ul>
        <button type="button" onClick={handleAddProject}> Adicionar Projeto </button>
        </>
    );
}

export default App;
