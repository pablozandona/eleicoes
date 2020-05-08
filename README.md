## Projeto Eleicões

Aplicação web para criação de eleições para cargos cadastrados, com geração de relatórios.

[DEMO](https://eleicoes.tec.pet/)

### Back-end API REST

- Spring Boot v2.3.0
    - Spring Web;
    - Spring Data JPA;
    - PostgreSQL Driver;
    - Spring REST Docs;
- Database Postgres;

### Front-end

- React v16.13.1 com TypeScript
- Componentes [Ant Design](https://ant.design/) 4.2

### Container
- Docker

## Executar a aplicação
- Instalar o [Docker Compose](https://docs.docker.com/compose/install/)
- Clonar o repositório `git clone https://github.com/pablozandona/eleicoes.git`
- `cd eleicoes`
- `docker-compose up --build`
- Estará disponível em [http://localhost:8889/](http://localhost:8889/)

