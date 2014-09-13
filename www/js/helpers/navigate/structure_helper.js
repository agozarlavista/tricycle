var structure_helper = {
    'fr':{
        'origin':{
            'title':'Mon Message',
            'label':'À qui souhaitez-vous écrire?',
            'description':'', 
            'responses':[
                {'label':'Mon Boss', 'redir':'chooseyourboss'},
                {'label':'Une Femme', 'redir':'chooseyourgirl'},
                {'label':'Un Homme', 'redir':'chooseyourguy'},
                {'label':'Un Service', 'redir':'chooseyourservice'}
            ]
        },
        'chooseyourboss':{
            'title':'Mon Boss',
            'label':'Quel message souhaitez-vous faire passser?',
            'description':'', 
            'responses':[
                {'label':'Je démissionne', 'redir':'wrongwayboss'},
                {'label':'Je vais être en retard', 'redir':'sorryyourboss'},
                {'label':'je t\'aime', 'redir':'wrongwayboss'},
                {'label':'félicitation, beau travail!', 'redir':'complimentyourboss'}
            ]
        },
        'wrongwayboss':{
            'title':'.',
            'label':'vas te coucher, demain est un autre jour.',
            'description':'Ça va pas la tête, tu vas pas te faire ton boss. mauvaise idée. Prends bien en compte tout les paramètres...',
            'responses':[
                {'label':'Demander de l\'aide!', 'redir':'callnegre'}
            ]
        },
        'chooseyourgirl':{
            
        }
    }
}