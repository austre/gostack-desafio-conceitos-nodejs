const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/*function validateLikes(request,response,next){
  const {likes}=request.params;

  if(likes>0){
    console.log("likes:"+likes);
    return response.status(400).json({error:"You cannot update likes directly!"});
  }

  return next();
}

app.use('/repositories/:id',validateLikes);*/

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs}=request.body;
  const repository={id:uuid(),title:title,url:url,techs:techs,likes:0};
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id}=request.params;
  const repositorytIndex=repositories.findIndex(repository=>repository.id==id);
  const {title,url,techs}=request.body;

  if(repositorytIndex<0){
    return response.status(400).json({eror:"Repository not found!"});
  }

  const repository=repositories[repositorytIndex];
  repository.id=id;
  repository.title=title;
  repository.url=url;
  repository.techs=techs;

  repositories[repositorytIndex]=repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id}=request.params;
  const repositorytIndex=repositories.findIndex(repository=>repository.id==id);

  if(repositorytIndex<0){
    return response.status(400).json({eror:"Repository not found!"});
  }

  repositories.splice(repositorytIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}=request.params;
  const repositorytIndex=repositories.findIndex(repository=>repository.id==id);

  if(repositorytIndex<0){
    return response.status(400).json({eror:"Repository not found!"});
  }

  const repository=repositories[repositorytIndex];
  repository.likes++;

  repositories[repositorytIndex]=repository;
  return response.json(repository);
});

module.exports = app;
