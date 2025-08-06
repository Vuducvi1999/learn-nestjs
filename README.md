project: practice-market-management-using-nestjs 

### required 
- kết nối mongodb bằng MongooseModule.forRoot 
  + sử dụng reference document  

- tạo StoreSchema 
	+ name 
	+ optional images: object[] 
	+ items: Item[] 
	+ owner: User

- StoreService 
	+ findAll 
	+ create 
	+ findById 
	+ updateById 
	+ deleteById 
		* xóa luôn cả image trên s3 
	+ uploadImage 

- StoreController 
	+ getAll 
		* validate bằng StoreQueryDto 
		* search by Name contained keyword 
		* phân trang 
	+ create
		* validate bằng CreateStoreDto 
	+ getById 
	+ updateById 
		* validate bằng UpdateStoreDto 
	+ deleteById 

- triển khai authen sử dụng passport-jwt 
  + accessToken
  + refreshToken (rotation)
- tạo UserSchema 
	+ name
	+ email 
	+ password 

- ItemSchema 
	+ name 
	+ description
	+ price 
	+ store: ref Store 

- author bằng attribute-base-access-control với casl library 
	+ customer chỉ có thể xem tất cả các sản phẩm 
	+ owner là customer nhưng được create, update, delete sản phẩm trong cửa hàng của mình 

- testing 
	+ unit test 
	+ e2e test 


### apis
- POST /auth/register
- POST /auth/login
- POST /auth/refresh-token

- GET /owners/items
- GET /owners/stores

- POST /stores
- GET /stores
- GET /stores/:id
- PATCH /stores/:id
- DELETE /stores/:id

- GET /items
- POST /items
- PATCH /items/:id
- DELETE /items/:id

### optional 
- swagger 

- setup aws s3 
	+ tạo iam user chỉ sử dụng để thao tác với s3 
	+ tạo s3 

- AwsS3Service (sử dụng multer) 
	+ uploadImage 
	+ deleteImage 

- cicd by github action to aws ec2 
	+ optional: using jenkins instead
	+ optional: operate by docker swarm  
