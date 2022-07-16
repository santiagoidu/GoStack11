import express from 'express';

const app = express();

app.get('/', (resquest, response) => {
    return response.json({ message: 'Hello Word' });
});

app.listen(3333, () => {
    console.log('🚀 Sever started on port 3333')
});
