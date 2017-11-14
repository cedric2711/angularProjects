declare var TreeLookup: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  treeLook=new TreeLookup();
  searchValue='';
  treeObject={};
  rootValue=[];
  leafValue='';
  textClassValue='text-success';
  textClass=this.textClassValue;
  valueFound=false;
  rootCount=0;
  rootChildCount=0;
  requiedPathValue='';
  listTree="";
  constructor() { }

  ngOnInit() {
  }
  updateRequiedPath(message){
    var req='';
    if(typeof(message)=="undefined"){
      for(var xx=0; xx<(this.rootValue.length-1); xx++){
        req+='/'+this.rootValue[xx]+'/'+this.leafValue+', ';
      }
      req+='/'+this.rootValue[this.rootValue.length-1]+'/'+this.leafValue;
    }else{
      req=message;
    }
    this.requiedPathValue=req;
    this.textClass=this.textClassValue;
  }

  drawTree(){
    if(this.treeObject){
      this.listTree='<h4>Tree from lookup</h4>';
      this.listTree+='<ul class="treeSetRoot">';
      for(var key in this.treeObject){
        var childValues=this.treeObject[key];
        var classToAdd='';
        for(var rr=0; rr<this.rootValue.length; rr++){
          if(this.rootValue[rr]==key){
            classToAdd="foundRoot";
            break;
          }
        }
        this.listTree+='<li class="'+classToAdd+'">'+key+'<ul>';
        classToAdd='';
        for(var ll=0; ll<childValues.length; ll++){
          if(this.leafValue==childValues[ll]){
            classToAdd="foundChild";
          }else{
            classToAdd="baseColor";
          }
          this.listTree+='<li class="'+classToAdd+'">'+childValues[ll]+'</li>';
          classToAdd='';
        }
        this.listTree+='</ul>';
      }
      this.listTree+='</ul>'
    }
  }
  onSearchChange(event: any){
    this.valueFound=false;
    this.leafValue='';
    this.rootValue=[];
    this.rootChildCount=0;
    this.rootCount=0;
    this.searchValue=event.target.value;
    var that=this;
    Promise.resolve(that).then(function(that){
      that.treeLook.getChildrenAsCallback('/',function(err,prNodes){
        that.rootCount=prNodes.length;
        var valueAtRoot = prNodes.indexOf(that.searchValue);
        if (valueAtRoot != -1) {
            that.valueFound=true;
            that.rootValue.push(prNodes[valueAtRoot]);
            console.log('/' + prNodes[valueAtRoot]);
            that.updateRequiedPath(undefined);
        }
        for (var i = 0; i < prNodes.length; i++) {
           Promise.resolve({'num':prNodes[i],'sObj':that}).then(function(passedObj) {
                var that=passedObj.sObj;
                var value=passedObj.num;
               that.treeLook.getChildrenAsPromise('/' + value)
                    .then(function(nodesFromPromise) {
                        var that=passedObj.sObj;
                        var value=passedObj.num;
                        that.rootChildCount++;
                        that.treeObject[value]=nodesFromPromise;
                       var valuePresentAt = nodesFromPromise.indexOf(that.searchValue);
                        if (valuePresentAt != -1) {
                            that.valueFound=true;
                            that.leafValue=nodesFromPromise[valuePresentAt];
                            that.rootValue.push(value);
                            that.updateRequiedPath(undefined);
                            that.textClassValue='text-success';
                        }else if(!that.valueFound && that.searchValue!=""){
                            that.updateRequiedPath("Ooops! Value not present in the Tree");
                            that.textClassValue='text-warning';
                        }else if(that.searchValue==""){
                          that.updateRequiedPath("No number entered to search");
                          that.textClassValue='text-info';
                        }
                        if(that.rootCount==that.rootChildCount)
                          that.drawTree();
                        return nodesFromPromise;

                    });

            });
        }

      });
    });

  }

}
