var CrossImage = "res/Cross.png";
var ShapeImage = "res/Shape.png";
var DefaultImage = "res/CircleCross.jpg";

var RightArrow = "res/arrowR.png";
var LeftArrow = "res/arrowL.png";

var foo = function(x){
    return [Math.floor(x/3), x%3];
};

var Game = React.createClass({
    getInitialState: function(){
        var boards = [];
        for(var i = 0; i <4; i++)
            boards[i] = <Board randomBoard={this.randomBoard} ref = { "id" + i.toString()} id = { "id" + i.toString()} />;
        return({
            boards: boards
        })
    },
    render: function(){
            return(
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td><div id = "buttons"><ButtonR ide = "#id0"/><ButtonL ide = "#id0"/></div></td>
                            <td><div id="id0">{this.state.boards[0]}</div></td>
                            <td><div id="id1">{this.state.boards[1]}</div></td>
                            <td><div id="buttons"><ButtonR ide = "#id1"/><ButtonL ide = "#id1"/></div></td>
                        </tr>
                        <tr>
                            <td><div id="buttons"><ButtonR ide = "#id2"/><ButtonL ide = "#id2"/></div></td>
                            <td><div id="id2">{this.state.boards[2]}</div></td>
                            <td><div id="id3">{this.state.boards[3]}</div></td>
                            <td><div id="buttons"><ButtonR ide = "#id3"/><ButtonL ide = "#id3"/></div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
    },

    randomBoard: function(){
        var randomId = Math.floor((Math.random() * 4));
        var isMarkSucced = true;

        //no co za menda, musze switcha pisac
        switch (randomId){
            case 0:
                isMarkSucced = this.refs.id0.oponentMarkField();
                break;
            case 1:
                isMarkSucced = this.refs.id1.oponentMarkField();
                break;
            case 2:
                isMarkSucced = this.refs.id2.oponentMarkField();
                break;
            case 3:
                isMarkSucced = this.refs.id3.oponentMarkField();
                break;
        }
        if(!isMarkSucced)
            this.randomBoard();
    }

});

var Board = React.createClass({
    getInitialState: function(){
        var fields = [[], [], []];
        for(var i = 0; i <3; i++)
            for(var k = 0; k<3; k++)
                fields[i][k] = DefaultImage;
        return({
            numberOfMarkedFileds: 0,
            imageFields: fields

        })
    },
    render: function(){
        var crossArray = [];
        for(var i = 0; i < 9; i++){
            crossArray.push(<Field key = {i} possition = {i} markFieldFunction={this.markField} image={this.state.imageFields[Math.floor(i/3)][i%3]}/>);
        }
        return(
            <div id="stars">
                {crossArray}
            </div>
        )
    },
    markField: function(x, y){
        var fields = this.state.imageFields;
        if(fields[x][y] == DefaultImage) {
            fields[x][y] = ShapeImage;
            this.setState({
                imageFields: fields,
                numberOfMarkedFileds: this.state.numberOfMarkedFileds + 1
            })
            setTimeout(this.props.randomBoard, 2000);
        }
    },
    oponentMarkField: function(){
        var isTrue = true;
        if(this.state.numberOfMarkedFileds <9) {
            while (isTrue) {
                var oponentPossition = Math.floor((Math.random() * 9));
                if (this.state.imageFields[Math.floor(oponentPossition / 3)][oponentPossition % 3] == DefaultImage) {
                    var fields = this.state.imageFields;
                    fields[Math.floor(oponentPossition / 3)][oponentPossition % 3] = CrossImage;
                    this.setState({
                        imageFields: fields,
                        numberOfMarkedFileds : this.state.numberOfMarkedFileds +1
                    })
                    isTrue = false;
                    var oponentBoardToRotate = ("#id" +Math.floor((Math.random() * 4)).toString());
                    var isPlus = Math.floor(Math.random()*2);
                    var fi = 0;
                    if(isPlus == 1){
                        fi =90;
                    }else{
                        fi =-90;
                    }
                    rotate(oponentBoardToRotate, fi);
                    return true;
                }
            }
        }
        return false;
    }
});

var Field = React.createClass({
    render: function(){
        return(
            <a href="#" onClick={this.props.markFieldFunction.bind(null, Math.floor(this.props.possition / 3), this.props.possition % 3)}>
                <img className="field" src={this.props.image}/>
            </a>
        );
    }
});

var ButtonR = React.createClass({
    render: function(){
        return(
            <a href="#" onClick={this.rotate.bind(null, this.props.ide)}>
                <img className="button" src={RightArrow}/>
            </a>
        );
    },
    rotate: function(ide) {
        var angle = ($('#foo').data('angle')+90) || 90;
        console.log(angle);
        $(ide).css({'transform': 'rotate(' + angle + 'deg)'});
        $(ide).data('angle', angle);
    }
});

var ButtonL = React.createClass({
    render: function(){
        return(
            <a href="#" onClick={this.rotate.bind(null, this.props.ide)}>
                <img className="button" src={LeftArrow}/>
            </a>
        );
    },
    rotate: function(ide) {
        var angle = ($('#foo').data('angle')-90) || -90;
        console.log(angle);
        $(ide).css({'transform': 'rotate(' + angle + 'deg)'});
        $(ide).data('angle', angle);
    }
});

var rotate = function(ide, fi) {
    var angle = ($('#foo').data('angle')+fi) || fi;
    console.log("rotate AI");
    $(ide).css({'transform': 'rotate(' + angle + 'deg)'});
    $(ide).data('angle', angle);
}
ReactDOM.render(
    <Game />,
    document.getElementById('root'));