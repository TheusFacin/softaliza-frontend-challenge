# Desafio front-end softaliza

O desafio consiste em uma aplicação web para a divulgação de eventos, que são caracterizados por Título, Descrição, Data/Hora, E-mail e Telefone para contato, e podem ser presenciais, online, ou híbridos.

A aplicação apresenta as cinco funcionalidades de um CRUD: index, create, show, update e delete.

---

## Variáveis de ambiente

Para que a aplicação funcione corretamente, são necessárias algumas configurações de ambiente:

### Backend

- `PORT` - (OPCIONAL) - Define em qual porta o backend será executado. Se não informada, usará a porta `3333`
- `MONGODB_URI` - A url do banco de dados mongodb, com as devidas informações de autenticação

### Frontend

- `REACT_APP_API_URI` - (OPCIONAL) - O endereço da API do backend. Se não informada, usará `http://localhost:3333`. Obs: Se a variável `PORT` do backend for alterada, essa deverá ser também.
- `REACT_APP_MAPBOX_TOKEN` - O token de autenticação do mapbox

---

Desafio feito por Matheus Facin
