import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from "react-native";

import api from "./services/api";

//Não possuem valor semântico(significado)
//Não possuem estilização própia

// View: div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3 


export default function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    },[]);

    async function handleAddProjec() {
        const response = await api.post('/projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Marco Tulio'
        });

        const project = response.data;
        setProjects([... projects, project])

    }
    
    return ( 
        <>
    <StatusBar barStyle="light-content" backgroundColor="#7159C1"/>

<SafeAreaView style={styles.container}>
    <FlatList 
    data={projects}
    keyExtractor={project => project.id}
    renderItem={({item: project}) => (
        <Text style={styles.project}>{project.title}</Text>
    )}
    /> 
    <TouchableOpacity style={styles.button} 
    activeOpacity={0.6}
    onPress={handleAddProjec}
    >
        <Text style={styles.buttonText}>Adicionar Projeto</Text>
    </TouchableOpacity>
</SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    project: {
        color: '#fff',
        fontSize: 30,
    },
    button: {
     alignSelf: 'stretch',
     backgroundColor: '#fff',
     margin: 20,
     height: 50,
     borderRadius: 4,
     justifyContent: "center",
     alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})