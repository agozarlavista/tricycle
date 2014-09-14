var structure_helper = {
    'fr':{
        'origin':{
            'title':'Mon Message',
            'label':'À qui souhaitez-vous écrire?',
            'description':'', 
            'responses':[
                {'label':'Mon Boss', 'redir':'chooseyourboss'},
                {'label':'Une Femme', 'redir':'chooseyourboss'},
                {'label':'Un Homme', 'redir':'chooseyourboss'},
                {'label':'Un Service', 'redir':'chooseyourboss'}
            ],
            'buttons':[]
        },
        'chooseyourboss':{
            'title':'Mon Boss',
            'label':'Quel message souhaitez-vous faire passser?',
            'description':'', 
            'responses':[
                {'label':'Je démissionne', 'redir':'wrongwayboss'},
                {'label':'Je vais être en retard', 'redir':'wrongwayboss'},
                {'label':'Je t\'aime', 'redir':'wrongwayboss'},
                {'label':'Félicitation, beau travail!', 'redir':'wrongwayboss'}
            ],
            'buttons':[]
        },
        'wrongwayboss':{
            'title':'Wrong Way',
            'label':'Vas te coucher, demain est un autre jour.',
            'description':'D\'après SafeMS, ce n\'est ni l\'heure, ni le lieu, ni le moment pour faire cette déclaration. Keep Calm, et demande de l\'aide à la communauté si tu ne veux pas te reposer tout de suite.',
            'responses':[
            ],
            'buttons':[
                {'label':'Je veux qu\'on m\'aide', 'icon':'F', 'redir':'help_form', 'color':'greena'}
            ]
        }
    }
}