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
  textClassValue='text-success';
  textClass=this.textClassValue;
  valueFound=false;
  requiedPathValue='';
  constructor() { }

  ngOnInit() {
  }
  updateRequiedPath(pathValue){
    debugger;
    this.requiedPathValue=pathValue;
    this.textClass=this.textClassValue;
  }
  onSearchChange(event: any){
    this.valueFound=false;

    this.searchValue=event.target.value;
    var that=this;
    Promise.resolve(that).then(function(that){
      that.treeLook.getChildrenAsCallback('/',function(err,prNodes){
        that;
        var valueAtRoot = prNodes.indexOf(that.searchValue);
        if (valueAtRoot != -1) {
            that.valueFound=true;
            console.log('/' + prNodes[valueAtRoot]);
            that.updateRequiedPath('/' + prNodes[valueAtRoot]);
        }
        for (var i = 0; i < prNodes.length; i++) {
           Promise.resolve({'num':prNodes[i],'sObj':that}).then(function(passedObj) {
                var that=passedObj.sObj;
                var value=passedObj.num;
               that.treeLook.getChildrenAsPromise('/' + value)
                    .then(function(nodesFromPromise) {
                        var that=passedObj.sObj;
                        var value=passedObj.num;
                        that.treeObject[value]=nodesFromPromise;
                       var valuePresentAt = nodesFromPromise.indexOf(that.searchValue);
                        if (valuePresentAt != -1) {
                            that.valueFound=true;
                            var val='/' + value + '/' + nodesFromPromise[valuePresentAt];
                            console.log(val);
                            that.updateRequiedPath(val);
                            that.textClassValue='text-success';
                        }else if(!that.valueFound && that.searchValue!=""){
                            that.updateRequiedPath("Ooops! Value not present in the Tree");
                            that.textClassValue='text-warning';
                        }else if(that.searchValue==""){
                          that.updateRequiedPath("No number entered to search");
                          that.textClassValue='text-info';
                        }

                        return nodesFromPromise;

                    });

            });
        }
        debugger;
      });
    });

  }

}
