const styles = theme => ({
    typesContainer: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh'
    },
    typesContent: {
        padding: 10,
        border: '1px solid #ddd',
        width: '100%',
        backgroundColor: '#bbb',
        paddingLeft: 210
    },
    cardContainer: {
        padding: 10,
        marginBottom: 5
    },
    selectContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttonGroup: {
        marginTop: 10
    },
    infoMachineContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    infoMachineItem: {
        '& strong': {
            color: '#10131291'
        }
    },
    imagesContainer: {
        overflow: 'scroll',
        overflowY: 'hidden',
        display: 'flex',
        flexDiretion: 'row',
        padding:10,
        "& a":{
            "& img": {
                marginRight: 10,
                width: 100,
                height: 100,
                border: '1px solid #ccc'
            }
        }
    }
})

export default styles;