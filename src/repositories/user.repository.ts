import { BaseInterfaceRepository } from './base/base.interface.repository';

export class UserRepository implements BaseInterfaceRepository {
  public create(data: any | T): Promise<T> {
    return new Promise(function (resolve, reject) {
      resolve(1);
      reject();
    });
  }
}


import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

	public async createProduct(
		createProductDto: CreateProductDTO,
	): Promise<Product> {
		const { name, description, price } = createProductDto;

		const product = new Product();
		product.name = name;
		product.description = description;
		product.price = price;

		await product.save();
		return product;
	}

	public async editProduct(
		createProductDto: CreateProductDTO,
		editedProduct: Product,
	): Promise<Product> {
		const { name, description, price } = createProductDto;

		editedProduct.name = name;
		editedProduct.description = description;
		editedProduct.price = price;
		await editedProduct.save();

		return editedProduct;
	}
}
