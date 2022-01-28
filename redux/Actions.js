var lista = []
export var itemAction = (name) => {
    return {
        type: 'changeItem',
        playload: name,
    }
}
export var cardAddAction = (name) => {
    let listaTest = [] 
    lista.map(list => {
        listaTest.push(list.id)
    })

        if(listaTest.includes(name.id)){
            lista.map(list => {
                if(list.id === name.id){
                    list.kolicina = Number(list.kolicina) + Number(name.kolicina)
                }
            })
        }
        else{
            lista = [...lista, {...name}]
        }
    return {
        type: 'changeCardAdd',
        playload: [...lista],
    }
}
export var cardRemoveAction = (name) => {
    lista.map((list, i) => {
        if(list.id === name.id){
            if(list.kolicina == 1){
                lista.splice(i, 1);
            }
            else{
                lista[i].kolicina = Number(lista[i].kolicina) - Number(name.kolicina)
            }
        }
    })
    return {
        type: 'changeCardRemove',
        playload: [...lista],
    }
}