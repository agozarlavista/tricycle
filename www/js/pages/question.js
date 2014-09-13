var question_page = {
    _quizStructure : null,
    init : function(target){
        navigation._currentPageScript = this;
        console.log('question page ', navigation.pageInfos);
        console.log(structure_helper[app._language][navigation.pageInfos.quiz]);
        this._quizStructure = structure_helper[app._language][navigation.pageInfos.quiz];
        this.createTemplate();
    },
    createTemplate : function(){
        console.log('createTemplate');
        $('#screen div').first().find('#question_title').html(this._quizStructure.title);
        $('#screen div').first().find('#question_label').html(this._quizStructure.label);
        console.log('_quizStructure '+this._quizStructure);
        if(this._quizStructure.description != ''){
            $('#screen div').first().find('#question_description').css('display', 'table');
            $('#screen div').first().find('#question_description').html(this._quizStructure.description);
        }
        console.log('end of page '+this._quizStructure.responses.length);
        $('#screen div').first().find('#responses_list').html('');
        for(var i=0; i<this._quizStructure.responses.length; i++){
            var htmlTemplate = '<div class="response_label" data-page="question/quiz/'+this._quizStructure.responses[i].redir+'">';
                htmlTemplate += '<span class="label">'+this._quizStructure.responses[i].label+'</span>';
                htmlTemplate += '<div class="arrow">></span>';
                htmlTemplate += '</div>';
            console.log(htmlTemplate);
            $('#screen div').first().find('#responses_list').append(htmlTemplate);
        }
        console.log('end of page');
    },
    refresh : function(){
        
    },
    destroy : function(){
        
    }
}
question_page.init($('#question'));
//navigation._currentPageScript = question_page;