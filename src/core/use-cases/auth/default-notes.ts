import { Note } from '../../entities/note.entity';
import { randomUUID } from 'crypto';

export function getDefaultNotesForUser(userId: string): Note[] {
    const now = new Date();

    const welcomeNoteContent = JSON.stringify([
        {
            id: 'a52625db-5504-4774-85d3-2c7aad3bab17',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Vamos começar a utilizar o TwoDo.', styles: {} }],
            children: [],
        },
        {
            id: 'f07174ac-0463-488b-978d-18fc48d3dc14',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: '15e9292e-d5cd-4562-88b7-658576d89d3b',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Primeiro, o básico:', styles: { bold: true } }],
            children: [],
        },
        {
            id: '1463eff7-2804-48d3-8b96-7cfa0d54eb8f',
            type: 'checkListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', checked: true },
            content: [{ type: 'text', text: 'Clique em qualquer lugar e comece a digitar.', styles: {} }],
            children: [],
        },
        {
            id: 'c5398d5c-6699-4e6d-95d8-3050781392f7',
            type: 'checkListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', checked: false },
            content: [{ type: 'text', text: 'Adicione uma Imagem, Vídeo, Áudio ou Documentos.', styles: {} }],
            children: [],
        },
        {
            id: '99c2a599-95c4-4c56-8869-ebc984514c2c',
            type: 'checkListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', checked: false },
            content: [{ type: 'text', text: 'Adicione uma capa, importe ou selecione uma da galeria.', styles: {} }],
            children: [],
        },
        {
            id: '78281413-01a2-4ec3-b9de-57aae5e8b386',
            type: 'checkListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', checked: false },
            content: [
                { type: 'text', text: 'Passou o mouse e viu o ícone ', styles: {} },
                { type: 'text', text: '⋮⋮', styles: { bold: true } },
                { type: 'text', text: ' ao lado da caixa de seleção? Pode clicar nele e arrastar  para mover uma linha.', styles: {} },
            ],
            children: [],
        },
        {
            id: '845a15fa-7299-4524-b14f-e1e594db7187',
            type: 'checkListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', checked: false },
            content: [
                { type: 'text', text: 'Clique no botão ', styles: {} },
                { type: 'text', text: '+ Nova Página', styles: { bold: true } },
                { type: 'text', text: ' na parte de superior da barra lateral para criar uma página.', styles: {} },
            ],
            children: [],
        },
        {
            id: '2c81496b-1598-4ed7-8863-ff77a462dc84',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: 'da5e4336-61b7-49ea-9984-780a3417aa91',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Comece a organizar sua vida agora! ', styles: { bold: true } }],
            children: [],
        },
        {
            id: 'a52625db-5504-4774-85d3-2c7aad3bab17',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'TwoDo - Onde suas tarefas encontram ordem.', styles: {} }],
            children: [],
        },
        {
            id: '118bf196-a04a-4359-8e2f-274e444ed84b',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: 'c48f2ffd-536b-4f74-b3a3-5a47bdd3ef94',
            type: 'quote',
            props: { textColor: 'default', backgroundColor: 'default' },
            content: [
                { type: 'text', text: 'Esse projeto todo foi desenvolvido por Leonardo Gabriel Reis Henrique', styles: {} },
            ],
            children: [],
        },
    ]);

    const creditsNoteContent = JSON.stringify([
        {
            id: '1',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [
                {
                    type: 'text',
                    text: 'TwoDo é um projeto pessoal desenvolvido com inspiração do "Notion" com dedicação e atenção ao máximo da qualidade de código e organização de camadas com cada responsabilidade separada, para implementar a Clean Architecture de "Uncle Bob".',
                    styles: {}
                }
            ],
            children: [],
        },
        {
            id: 'blank-1',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: '2',
            type: 'heading',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', level: 3 },
            content: [
                { type: 'text', text: 'Desenvolvedor Responsável', styles: { bold: true } },
                { type: 'text', text: ' 👨‍💻', styles: {} }
            ],
            children: [],
        },
        {
            id: '3',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Todo o projeto foi idealizado, arquitetado e implementado por:', styles: {} }],
            children: [],
        },
        {
            id: '4',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Leonardo Gabriel Reis Henrique', styles: { bold: true } }],
            children: [],
        },
        {
            id: '5',
            type: 'quote',
            props: { textColor: 'default', backgroundColor: 'default' },
            content: [{ type: 'text', text: 'Fullstack Developer | Front-end Developer | UI Designer', styles: {} }],
            children: [],
        },
        {
            id: 'blank-2',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: '6',
            type: 'heading',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', level: 3 },
            content: [
                { type: 'text', text: 'Arquitetura', styles: { bold: true } },
                { type: 'text', text: ' 🧠', styles: {} }
            ],
            children: [],
        },
        {
            id: '7',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [
                {
                    type: 'text',
                    text: 'O TwoDo busca seguir rigorosamente ao máximo os princípios da Clean Architecture em busca de:',
                    styles: {}
                }
            ],
            children: [],
        },
        {
            id: '8',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'As regras de negócio sejam independentes de frameworks;', styles: {} }],
            children: [],
        },
        {
            id: '9',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Cada camada conheça apenas a imediatamente inferior;', styles: {} }],
            children: [],
        },
        {
            id: '10',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'As entidades estejam no centro da aplicação, livres de dependências externas;', styles: {} }],
            children: [],
        },
        {
            id: '11',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [
                {
                    type: 'text',
                    text: 'Essa abordagem traz benefícios reais em manutenabilidade, clareza na leitura e separação de responsabilidades.',
                    styles: {}
                }
            ],
            children: [],
        },
        {
            id: 'blank-3',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: '12',
            type: 'heading',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left', level: 3 },
            content: [
                { type: 'text', text: 'Tecnologias Utilizadas', styles: { bold: true } },
                { type: 'text', text: ' 🧩', styles: {} }
            ],
            children: [],
        },
        {
            id: '13',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Frontend (Angular 19 + NG-ZORRO)', styles: { bold: true } }],
            children: [],
        },
        {
            id: '14',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Framework: Angular 19 com TypeScript;', styles: {} }],
            children: [],
        },
        {
            id: '15',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'UI: NG-ZORRO com tema customizado;', styles: {} }],
            children: [],
        },
        {
            id: '16',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [
                { type: 'text', text: 'Arquitetura: Clean Architecture adaptada para Angular (core, adapters, infra, frameworks);', styles: {} }
            ],
            children: [],
        },
        {
            id: '17',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Integração com backend: Apollo GraphQL Client;', styles: {} }],
            children: [],
        },
        {
            id: '18',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [
                { type: 'text', text: 'Microfrontend: React + BlockNoteJs para edição avançada de notas.', styles: {} }
            ],
            children: [],
        },
        {
            id: 'blank-4',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: '19',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Backend (NestJS + MongoDB + GraphQL)', styles: { bold: true } }],
            children: [],
        },
        {
            id: '20',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Framework: NestJS com TypeScript;', styles: {} }],
            children: [],
        },
        {
            id: '21',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Banco de dados: MongoDB com Mongoose;', styles: {} }],
            children: [],
        },
        {
            id: '22',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'API: GraphQL com Apollo Driver;', styles: {} }],
            children: [],
        },
        {
            id: '23',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Armazenamento: AWS S3;', styles: {} }],
            children: [],
        },
        {
            id: '24',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [{ type: 'text', text: 'Cache e controle de e-mail: Redis;', styles: {} }],
            children: [],
        },
        {
            id: '25',
            type: 'bulletListItem',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [
                { type: 'text', text: 'Modularização: Separação entre core, application, infrastructure, interfaces e shared.', styles: {} }
            ],
            children: [],
        },
        {
            id: 'blank-5',
            type: 'paragraph',
            props: { textColor: 'default', backgroundColor: 'default', textAlignment: 'left' },
            content: [],
            children: [],
        },
        {
            id: '26',
            type: 'quote',
            props: { textColor: 'default', backgroundColor: 'default' },
            content: [
                { type: 'text', text: 'TwoDo - Onde suas tarefas encontram ordem.', styles: {} }
            ],
            children: [],
        }
    ]);

    return [
        new Note(randomUUID(), 'Bem-vindo ao Twodo 👋', welcomeNoteContent, userId, null, now, now, false),
        new Note(randomUUID(), 'Créditos 🏁', creditsNoteContent, userId, null, now, now, false),
    ];
}