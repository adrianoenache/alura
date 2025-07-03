# Imersão DevOps - Alura Google Cloud

Este projeto é uma API desenvolvida com FastAPI para gerenciar alunos, cursos e matrículas em uma instituição de ensino.

> Este **readme** foi alterado com instruções para executar usando o Windows no ambiente de desenvolvimento WSL2 e Podman ao invés de Docker. [Link do repositório com o código original](https://github.com/guilhermeonrails/imersao-devops/archive/refs/heads/main.zip).

## Setup do ambiente

![alt Abrir o WSL no VSCode](./readme-assets/wsl.avif)

### Links

- [IDE VSCode](https://code.visualstudio.com/Download)
- [WSL2](https://learn.microsoft.com/pt-br/windows/wsl/)
- [Podman](https://docs.podman.io/en/latest/)
- [Plugin VSCode - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Plugin VSCode - Container Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)
- [Git Docs](https://git-scm.com/doc)
- [Git](https://git-scm.com/download/linux) última versão estável
  - [Configure](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) seu usuário 
  - Configure seu acesso SSH
    - [GitBook](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)
    - [GitLab](https://docs.gitlab.com/ee/user/ssh.html#ed25519-ssh-keys)
    - [GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    - [Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/)

#### Links extras

- [Docker](https://www.docker.com/get-started/)
- [Docs Docker](https://docs.docker.com/)
- [Introdução aos contêineres remotos do Docker no WSL 2](https://learn.microsoft.com/pt-br/windows/wsl/tutorials/wsl-containers)

### Passos

#### 1 - Instale a IDE VSCode, o link está na seção acima.

#### 2 - Instale o WSL2 seguindo a documentação do link acima, pode ser necessário reiniciar a máquina.

#### 3 - Após reiniciar a máquina abra o Windows PowerShell como administrador.

Verifique a instalação executando no PowerShell o comando `wsl --version`.

```powershell
wsl --version
Versão do WSL: 2.5.9.0
Versão do kernel: 6.6.87.2-1
Versão do WSLg: 1.0.66
Versão do MSRDC: 1.2.6074
Versão do Direct3D: 1.611.1-81528511
Versão do DXCore: 10.0.26100.1-240331-1435.ge-release
Versão do Windows: 10.0.22631.5472
```

> **Dica:** Quando uma atualização do Windows é instalada pode ter uma nova atualização do WSL. Abra o Windows PowerShell como administrador, e execute `wsl --update` se houver uma atualização ela será instalada.

#### 4 - Instale uma distribuição Linux (Ubuntu-24.04)

O comando `wsl --list` lista as distribuições instaladas e o comando `wsl --list --online` lista as distribuições disponíveis para instalação.

```powershell
wsl --list --online
A seguir está uma lista de distribuições válidas que podem ser instaladas.
Instale usando 'wsl.exe --install <Distro>'.

NAME                            FRIENDLY NAME
AlmaLinux-8                     AlmaLinux OS 8
AlmaLinux-9                     AlmaLinux OS 9
AlmaLinux-Kitten-10             AlmaLinux OS Kitten 10
AlmaLinux-10                    AlmaLinux OS 10
Debian                          Debian GNU/Linux
FedoraLinux-42                  Fedora Linux 42
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
SUSE-Linux-Enterprise-15-SP7    SUSE Linux Enterprise 15 SP7
Ubuntu                          Ubuntu
Ubuntu-24.04                    Ubuntu 24.04 LTS
archlinux                       Arch Linux
kali-linux                      Kali Linux Rolling
openSUSE-Tumbleweed             openSUSE Tumbleweed
openSUSE-Leap-15.6              openSUSE Leap 15.6
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1

wsl --install Ubuntu-24.04
```

Siga os passos da instalação, será pedido ao usuário definir um nome e senha para o usuário administrador da distribuição.

> **Dica:** é possível ter várias distribuições instaladas e usá-las ao mesmo tempo em janelas diferentes do VSCode. Caso tenha mais de uma use o comando `wsl --set-default Ubuntu-24.04` para escolher qual delas será a padrão. Observação: A distribuição que eu recomendo é **Ubuntu-24.04** porque com ela você vai ter a versão do Podman mais atual.

#### 5 - Abra o VSCode 

Instale os plugins - [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) e [Container Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-containers)

Em seguida clique no ícone no VSCode na canto inferior esquerdo para abrir o menu e selecione **Connect to WSL**. Isso fará com que o VSCode reinicie usando o WSL e neste caso irá usar a distribuição definida como padrão. Caso queira usar uma diferente selecione a outra opção para escolher uma das distribuições instaladas.

![alt Abrir o WSL no VSCode](./readme-assets/vscode-open-wsl.avif)

> **Atenção:** Cada distribuição tem o seu próprio sistema de arquivos e o que está instalado e configurado em uma não estárá na outra.

**Parabéns!!!** Você está rodando um Linux dentro do Windows.

#### 6 - Setup no Linux (Ubuntu-24.04)

No VSCode abra o terminal `ctrl + '`. Agora você vai executar alguns comandos como administrador usando `sudo`. Quando o comando for executado você irá usar a senha que você criou para o administrador quando fez a instalação da distribuição.

Primeiro vamos adicionar o repositório do Git para pegar a versão mais atual quando ele for instalado ou atualizado, este comando está nos links acima sobre o Git.

```Bash
sudo add-apt-repository ppa:git-core/ppa
```

Agora vamos executar os comandos `update`, `full-upgrade` e `install`.

```Bash
apt --help
apt 2.8.3 (amd64)
Usage: apt [options] command

apt is a commandline package manager and provides commands for
searching and managing as well as querying information about packages.
It provides the same functionality as the specialized APT tools,
like apt-get and apt-cache, but enables options more suitable for
interactive use by default.

Most used commands:
  list - list packages based on package names
  search - search in package descriptions
  show - show package details
  install - install packages
  reinstall - reinstall packages
  remove - remove packages
  autoremove - automatically remove all unused packages
  update - update list of available packages
  upgrade - upgrade the system by installing/upgrading packages
  full-upgrade - upgrade the system by removing/installing/upgrading packages
  edit-sources - edit the source information file
  satisfy - satisfy dependency strings

See apt(8) for more information about the available commands.
Configuration options and syntax is detailed in apt.conf(5).
Information about how to configure sources can be found in sources.list(5).
Package and version choices can be expressed via apt_preferences(5).
Security details are available in apt-secure(8).
                                        This APT has Super Cow Powers.
```

O comando `sudo apt update` não atualiza nada, ele busca as atualizações existentes mas não executa a instalação.

```Bash
sudo apt update
```

O comando `sudo apt full-upgrade` vai atualizar o core da distribuição e todos os pacotes instalados.

```Bash
sudo apt full-upgrade
```

O comando `sudo apt install git python3 python3.12-venv podman podman-compose` vai instalar os pacotes `git`, `python3` `python3.12-venv` `podman` e  `podman-compose`.

```Bash
sudo sudo apt install git python3 python3.12-venv podman podman-compose
```

Verifique a instalação dos pacotes usando o nome do pacote e a flag `--version`.

```Bash
git --version && python3 --version && podman-compose --version

git version 2.49.0
Python 3.12.3
podman-compose version: 1.0.6
['podman', '--version', '']
using podman version: 4.9.3
podman-compose version 1.0.6
podman --version 
podman version 4.9.3
exit code: 0
```

#### 7 - Configure o seu usuário do Git e configure a sua chave SSH seguindo os passos da documentação nos links acima.

Depois de gerar a chave SSH na pasta `.ssh`, que fica na raiz do seu usuário no Ubuntu e configurar a chave pública no GitHub, quando você acessar pela primeira vez o GitHub pelo terminal, confirme a adição aos hosts e aqui pode acontecer um erro de permissão de acesso.

Para resolver execute no terminal `code .bashrc` para abrir e editar este arquivo. No começo do arquivo adicione as linhas abaixo. Lembrando de alterar o nome do seu usuário (**nomeDoSeuUsuario**) e o nome do arquivo da chave privada na pasta `.ssh` (**id_ed25519**).

```
eval $(ssh-agent -s)
ssh-add /home/nomeDoSeuUsuario/.ssh/id_ed25519
```

Salve o arquivo, feche e reinicie o terminal. Se deu tudo certo quando abrir o terminal vai aparecer algo como:

```bash
Agent pid 187984
Identity added: /home/nomeDoSeuUsuario/.ssh/id_ed25519 (seu@email.com)
```

## Imerção Alura DevOps com Google Cloud

Abra o VSCode no WSL, use o comando `ctrl + '` para abrir o terminal. Crie uma pasta com o comando `mkdir alura`. Em seguida entre na pasta com o comando `cd alura`. Agora use o comando:

```bash
git clone git@github.com:guilhermeonrails/ellis.git imersao-devops
```

> **Dica:** Note que após link do repositório eu coloquei **imersao-devops** isso faz com que o git clone crie a pasta com este nome, caso contrário o nome da pasta acabaria sendo **ellis**.

Agora no menu **File** no VSCode clique em **Open folder** navegue e selecione a pasta **imersao-devops**.

### Executando o projeto sem o Podman

Abra o terminal `ctrl + '` no VSCode e execute:

```bash
python3 -m venv ./venv
```

Um erro pode aparecer aqui se você não instalou o pacote **python3.12-venv** nos passos anteriores. Se aconteceu apague a pasta criada `rm -rf venv/`, instale o pacote e execute o comando acima novamente.

Agora inicie o ambiente python com o comando:

```bash
source venv/bin/activate
```

> **Dica:** Digite `deactivate` no terminal para encerrar o ambiente python.

O comando `pip` é um instalador de pacotes do python assim como o `npm` no NodeJS e o `requirements.txt` lista as dependências a serem instaladas como no `package.json` do NPM, execute:

```bash
pip install -r requirements.txt
```

> **Dica:** Este passo você executa somente uma vez, depois que as dependências estão instaladas basta usar o comando `source venv/bin/activate` antes de executar o próximo passo.

Agora inicie o servidor executando o comando:

```bash
uvicorn app:app --reload
```

Se tudo correu bem acesse a página pelo link abaixo.

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Aqui você pode testár todos os endpoints da API de forma interativa.

![alt Abrir o WSL no VSCode](./readme-assets/sem-podman.avif)

### Executando o projeto com o Podman

Crie o arquivo `.containerignore` com o conteúdo abaixo. O arquivo de ignore irá fazer com que os caminhos declarados não sejam adicionados na construção da imagem.

```Docker
# Paths to ignore
__pycache__
venv
```

Crie o arquivo `.Containerfile` com o conteúdo abaixo. Este arquivo contém as informações para a construção da imagem.

```Docker
FROM python:3.13.4-alpine3.22

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000",  "--reload"]
```

Crie a imagem do podman executando o comando:

```Docker
podman build -t imersaodevops .
```

Execute a imagem do podman com o comando:

```Docker
podman run -d -p 8000:8000 imersaodevops
```

Se tudo correu bem acesse a página com o link abaixo.

[http://localhost:8000/docs](http://localhost:8000/docs)

> **Observação:** Com o Podman é necessário acessar o localhost com `http://localhost` e não pelo **IP**.

![alt Abrir o WSL no VSCode](./readme-assets/com-podman.avif)

Veja a imagem criada com o comando `podman images`.

```Docker
podman images

REPOSITORY                            TAG                IMAGE ID      CREATED             SIZE
localhost/imersaodevops               latest             276ba020255d  About a minute ago  100 MB
```

Veja os containers em execução com o comando `podman ps`

```Docker
podman ps

CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS        PORTS                   NAMES
102dd9fd0b9a  localhost/imersaodevops:latest  uvicorn app:app -...  2 minutes ago  Up 2 minutes  0.0.0.0:8000->8000/tcp  hungry_galois
```

Pare um container com o comando:

```Docker
podman stop 102dd9fd0b9a
```

> **Dica:** Para mais comandos consulte a documentação na seção links no topo.

Crie o arquivo `compose.yml` com o conteúdo abaixo. Este arquivo contém as informações para execução do podman-compose.

```yml
services:
  app:
    build: .
    container_name: imersao-devops
    ports:
      - "8000:8000"
    volumes:
      - .:/app
```

Execute o comando `podman-compose up -d` para criar e iniciar a execução do container.

```bash
podman-compose up -d

podman-compose version: 1.0.6
['podman', '--version', '']
using podman version: 4.9.3
** excluding:  set()
['podman', 'inspect', '-t', 'image', '-f', '{{.Id}}', 'devops-google-cloud-project-start_app']
['podman', 'ps', '--filter', 'label=io.podman.compose.project=devops-google-cloud-project-start', '-a', '--format', '{{ index .Labels "io.podman.compose.config-hash"}}']
['podman', 'network', 'exists', 'devops-google-cloud-project-start_default']
podman run --name=imersao-devops -d --label io.podman.compose.config-hash=32905d205708eaf1fb5cbaec2351b729dba602b12dfde152876afc891fe52bfd --label io.podman.compose.project=devops-google-cloud-project-start --label io.podman.compose.version=1.0.6 --label PODMAN_SYSTEMD_UNIT=podman-compose@devops-google-cloud-project-start.service --label com.docker.compose.project=devops-google-cloud-project-start --label com.docker.compose.project.working_dir=/home/adrianoenache/gitHub-adrianoenache/alura/imersao/devops/devops-google-cloud-project-start --label com.docker.compose.project.config_files=compose.yml --label com.docker.compose.container-number=1 --label com.docker.compose.service=app -v /home/adrianoenache/gitHub-adrianoenache/alura/imersao/devops/devops-google-cloud-project-start:/app --net devops-google-cloud-project-start_default --network-alias app -p 8000:8000 devops-google-cloud-project-start_app
5434448987d70ed3cf4724c1c54c17af863e4604f4d6a594480f54c8dd1387a9
exit code: 0

podman ps

CONTAINER ID  IMAGE                                                   COMMAND               CREATED        STATUS        PORTS                   NAMES
922d0290bef0  localhost/devops-google-cloud-project-start_app:latest  uvicorn app:app -...  8 seconds ago  Up 9 seconds  0.0.0.0:8000->8000/tcp  imersao-devops
```

Pare a execução do container com o comando `podman-compose stop`

```bash
podman-compose stop

podman-compose version: 1.0.6
['podman', '--version', '']
using podman version: 4.9.3
podman stop -t 10 imersao-devops
imersao-devops
exit code: 0
```

Inicie a execução do container com o comando `podman-compose start`, caso use o comando `podman-compose up -d` o container será iniciado mas também irá mostrar um erro pois o container *imersao-devops* já foi criado.

```bash
podman-compose start

podman-compose version: 1.0.6
['podman', '--version', '']
using podman version: 4.9.3
podman start imersao-devops
imersao-devops
exit code: 0
```

Para destruir o container use o comando `podman-compose down -v`.

```bash
podman-compose down -v

podman-compose version: 1.0.6
['podman', '--version', '']
using podman version: 4.9.3
** excluding:  set()
podman stop -t 10 imersao-devops
imersao-devops
exit code: 0
podman rm imersao-devops
imersao-devops
exit code: 0
keep set()
['podman', 'volume', 'ls', '--noheading', '--filter', 'label=io.podman.compose.project=devops-google-cloud-project-start', '--format', '{{.Name}}']
```

## Criando CI no GitHub Actions

Crie as pastas na raiz do seu repositório `.github/workflows/` com o arquivo `docker-image.yml` com o conteúdo abaixo.

```yml
name: Docker Image CI Imersão DevOps

on:
  push:
    branches: [ "nomeDoBranch" ]
  pull_request:
    branches: [ "nomeDoBranch" ]

jobs:

  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Build the Docker image of Imersão DevOps
      run: docker build localDoBuild --file localDoContainerfile --tag alura-imersao-devops:$(date +%s)
```

> **Dica:** Não esqueça de colocar os valores corretos em `nomeDoBranch`, `localDoBuild` e `localDoContainerfile`. Veja neste [arquivo de exemplo](https://github.com/adrianoenache/alura/blob/imersao-devops/.github/workflows/docker-image.yml).

Veja o resultado da aula 2 em [Build do CI do Alura Imersão DevOps](https://github.com/adrianoenache/alura/actions/runs/16060348123/job/45324690942).

## Instalando GCloud CLI no WSL2 no Ubuntu-24.04

Guia de instalação da [CLI](https://cloud.google.com/sdk/docs/install#deb) Google Cloud.

Algumas coisas diferentes do video da imersão aconteceram. Primeiro não consegui altenticar executando apenas com o comando `gcloud init` houve um erro e a CLI mostrou a opção de usar a flag `--no-browser`, alguns passos a mais e deu tudo certo. Outra coisa foi que eu não precisei digitar o ID pois a CLI detectou o projeto criado e me deu a opção de o selecionar.

```Bash
gcloud init --no-browser

Welcome! This command will take you through the configuration of gcloud.

Your current configuration has been set to: [default]

You can skip diagnostics next time by using the following flag:
  gcloud init --skip-diagnostics

Network diagnostic detects and fixes local network connection issues.
Checking network connection...done.                                                               
Reachability Check passed.
Network diagnostic passed (1/1 checks passed).

You must sign in to continue. Would you like to sign in (Y/n)?  Y

You are authorizing gcloud CLI without access to a web browser. Please run the following command on a machine with a web browser and copy its output back here. Make sure the installed gcloud version is 372.0.0 or newer.

gcloud auth login --remote-bootstrap="https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=32555940559.apps.googleusercontent.com&scope=openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fappengine.admin+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fsqlservice.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcompute+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Faccounts.reauth&state=wviAUFU5pNtEDX9zDR7y9bc29xVya0&access_type=offline&code_challenge=uO63YGll2hckBUd-86zGgsSh0dQ_tWXOZL4uzJyNEoM&code_challenge_method=S256&token_usage=remote"

Enter the output of the above command: ### Ha! ha! ha! você não sabe a senha ha! ha! ha! ###

Pick cloud project to use: 
 [1] alura-imersao-devops-464711
 [2] Enter a project ID
 [3] Create a new project
Please enter numeric choice or text value (must exactly match list item):  1

Your current project has been set to: [alura-imersao-devops-464711].

Not setting default zone/region (this feature makes it easier to use
[gcloud compute] by setting an appropriate default value for the
--zone and --region flag).
See https://cloud.google.com/compute/docs/gcloud-compute section on how to set
default compute region and zone manually. If you would like [gcloud init] to be
able to do this for you the next time you run it, make sure the
Compute Engine API is enabled for your project on the
https://console.developers.google.com/apis page.

Created a default .boto configuration file at [/home/adrianoenache/.boto]. See this file and
[https://cloud.google.com/storage/docs/gsutil/commands/config] for more
information about configuring Google Cloud Storage.
The Google Cloud CLI is configured and ready to use!

* Commands that require authentication will use ena.adr@gmail.com by default
* Commands will reference project `alura-imersao-devops-464711` by default
Run `gcloud help config` to learn how to change individual settings

This gcloud configuration is called [default]. You can create additional configurations if you work with multiple accounts and/or projects.
Run `gcloud topic configurations` to learn more.

Some things to try next:

* Run `gcloud --help` to see the Cloud Platform services you can interact with. And run `gcloud help COMMAND` to get help on any gcloud command.
* Run `gcloud topic --help` to learn about advanced features of the CLI like arg files and output formatting
* Run `gcloud cheat-sheet` to see a roster of go-to `gcloud` commands.
```

Aqui tive um segundo "problema" que não é um problema na execuão da CLI na hora de construir o container deu erro porque estou usando os arquivos do Podman `Containerfile` e `.containerignore`. Como estamos usando os arquivos fonte do exercicio para criar o container e não uma imagem ja criada isso aconteceu. A solução foi simplesmente duplicar os arquivos com os nomes `Dockerfile` e `.dockerignore` usados pelo Docker e tudo funcionou.

```bash
gcloud run deploy --port=8000

Deploying from source. To deploy a container use [--image]. See https://cloud.google.com/run/docs/deploying-source-code for more details.
Source code location (/home/adrianoenache/gitHub-adrianoenache/alura/imersao/devops/devops-google-cloud-project-start):  
Next time, you can use `--source .` argument to deploy the current directory.

Service name (devops-google-cloud-project-start):  alura-imersao-devops
Please specify a region:
 [1] africa-south1
 [2] asia-east1
 [3] asia-east2
 [4] asia-northeast1
 [5] asia-northeast2
 [6] asia-northeast3
 [7] asia-south1
 [8] asia-south2
 [9] asia-southeast1
 [10] asia-southeast2
 [11] australia-southeast1
 [12] australia-southeast2
 [13] europe-central2
 [14] europe-north1
 [15] europe-north2
 [16] europe-southwest1
 [17] europe-west1
 [18] europe-west10
 [19] europe-west12
 [20] europe-west2
 [21] europe-west3
 [22] europe-west4
 [23] europe-west6
 [24] europe-west8
 [25] europe-west9
 [26] me-central1
 [27] me-central2
 [28] me-west1
 [29] northamerica-northeast1
 [30] northamerica-northeast2
 [31] northamerica-south1
 [32] southamerica-east1
 [33] southamerica-west1
 [34] us-central1
 [35] us-east1
 [36] us-east4
 [37] us-east5
 [38] us-south1
 [39] us-west1
 [40] us-west2
 [41] us-west3
 [42] us-west4
 [43] cancel
Please enter numeric choice or text value (must exactly match list item):  32

To make this the default region, run `gcloud config set run/region southamerica-east1`.

Allow unauthenticated invocations to [alura-imersao-devops] (y/N)?  Y

Building using Dockerfile and deploying container to Cloud Run service [alura-imersao-devops] in project [alura-imersao-devops-464711] region [southamerica-east1]
✓ Building and deploying new service... Done.                                                                                                                                                                                
  ✓ Uploading sources...                                                                                                                                                                                                     
  ✓ Building Container... Logs are available at [https://console.cloud.google.com/cloud-build/builds;region=southamerica-east1/b0a6cd10-468b-42fd-a2de-04fc2df11a9e?project=294538579546].                                   
  ✓ Creating Revision...                                                                                                                                                                                                     
  ✓ Routing traffic...                                                                                                                                                                                                       
  ✓ Setting IAM Policy...                                                                                                                                                                                                    
Done.                                                                                                                                                                                                                        
Service [alura-imersao-devops] revision [alura-imersao-devops-00001-fcm] has been deployed and is serving 100 percent of traffic.
Service URL: https://alura-imersao-devops-294538579546.southamerica-east1.run.app
```

[Aplicação da Alura imersão DevOps no Google Cloud](https://alura-imersao-devops-294538579546.southamerica-east1.run.app/docs)

![alt Abrir o WSL no VSCode](./readme-assets/alura-imersao-devops-google-cloud.avif)

## Estrutura do Projeto API de gestão escolar

- **app.py**: Arquivo principal da aplicação FastAPI.
- **models.py**: Modelos do banco de dados (SQLAlchemy).
- **schemas.py**: Schemas de validação (Pydantic).
- **database.py**: Configuração do banco de dados SQLite.
- **routers/**: Diretório com os arquivos de rotas (alunos, cursos, matrículas).
- **requirements.txt**: Lista de dependências do projeto.

> O banco de dados SQLite será criado automaticamente como `escola.db` na primeira execução. Para reiniciar o banco, basta apagar o arquivo `escola.db` (isso apagará todos os dados).
