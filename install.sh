function RUN {
	"$@"

	if [ $? -ne 0 ]; then
		exit 1
	fi
}


RUN cd ./api
RUN npm install
RUN cd ..
RUN cd ./front-end
RUN npm install