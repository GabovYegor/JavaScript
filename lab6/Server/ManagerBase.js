const debug    = require("debug")("manager");
const fs       = require("fs");
const DataPath = __dirname+'/Data/'

class ManagerBase {
	constructor(file) {
		this.file = DataPath + file;
		this.data = [];
		try {
			let str = fs.readFileSync(this.file, 'utf-8');
			if (!str)
			return;
			this.data = JSON.parse(str);
		} catch(err) { // Process read error
			if (err.code == 'ENOENT') {
				this.data = [];
				try {
					fs.writeFileSync(this.file, JSON.stringify(this.data));
				} catch(err) { // Process write error
					console.log(err);
					throw err;
				}
				console.log("No data file on server, new file was created:");
			} else {
				console.log(err);
				throw err;
			}
		}

		for(let i =0; i < this.data.length;i++){
			if(this.data[i].wealth){
				this.data[i].moneyOnStart = this.data[i].wealth;
				this.data[i].total = [{distribType:"Uniform",money:0},{distribType:"Normal",money:0}]
			}
		}
		console.log("sdsdsdsdsd",this.data);
		debug("Loaded data:");
		debug(this.data);
	}
	saveData() {
		fs.writeFileSync(this.file, JSON.stringify(this.data), (err) => {
			if (err)
				console.log(err);
		});
	}

	getData() {
		return this.data;
	}
	getInitial() {
		return this.initial;
	}
	getDataById(id) {
		for (let it of this.data)
		if (it.id == id) {
			return it;
		}
	}

	changeData(data) {
		this.data = data;
		this.saveData();
	}

	// Returns 1 if changing data succeed
	// Returns 0 if object with proper id wasn't found.
	changeDataById(id, newData) {
		for(let i in this.data) {
			if (this.data[i].id == id) {
				newData.id = id;
				this.data[i] = newData;
				debug("Changing data to:")
				debug(newData)
				this.saveData();
				return 1;
			}
		}
		debug("Data with id " + id + " wasn't found.")
		return 0;
	}
};

module.exports = ManagerBase;
