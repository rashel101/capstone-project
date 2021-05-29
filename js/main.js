

//I removed my api key to view photos get api key from https://www.pexels.com/api/
class Photo_Gal{
    constructor(){
        this.API_key=' ';
        this.gallery_Div=document.querySelector(".gallery");
        this.search_Forms=document.querySelector(".header form");
        this.loadMore=document.querySelector(".load-more");
        this.searchValueGo='';
        this.page_index=1;
        this.eventHandle();
    }
    eventHandle(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImg(1)
        });
        this.search_Forms.addEventListener('submit',(e)=>{
            this.page_index=1;
            this.getsearchedImg(e)
        });
        this.loadMore.addEventListener('click', (e)=>{
            this.loadMoreImages(e);
        })
    }
    async getImg(index){
        this.loadMore.setAttribute('data-img','curated');
        const baseURL=`https://api.pexels.com/v1/curated?page=${index}&per_page=12`
        const data= await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        console.log(data)
    }   
    async fetchImages(baseURL){
        const response= await fetch(baseURL,{
            method:'GET',
            headers:{
                Accept:'application/json',
                Authorization:this.API_key
            }
        });
        const data= await response.json();
        return data;
    }
    GenerateHTML(photos){
        photos.forEach(photo =>{
            const item= document.createElement('div');
            item.classList.add('item');
            item.innerHTML=`
            <a href='${photo.src.original}'target="_blank">
              <img src="${photo.src.medium}">
              <h3>${photo.photographer}</h3>
            </a>
            `;
            this.gallery_Div.appendChild(item)
        })
    }
   async getsearchedImg(e){
       this.loadMore.setAttribute('data-img','search')
        e.preventDefault();
        this.gallery_Div.innerHTML='';
        const searchValue= e.target.querySelector('input').value;
        this.searchValueGo=searchValue;
        const baseURL=`https://api.pexels.com/v1/search?query=${searchValue}&per_page=12`;
        const data= await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        e.target.reset();
    }
    async getMoreSearchedImg(index){
        const baseURL=`https://api.pexels.com/v1/search?query=${this.searchValueGo}&per_page=12`;
        const data= await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        e.target.reset();
     }
    loadMoreImages(e){
        let index= ++this.page_index;
        const loadMoreData=e.target.getAttribute('data-img')
        if(loadMoreData==='curated'){
            //loop page 2 for curated
            this.getImg(index)
        }else{
            //load page 2 for search
            this.getMoreSearchedImg(index)
        }
    }
}
const gallery= new Photo_Gal;