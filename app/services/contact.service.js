// * Định nghĩa lớp dịch vụ ContactService 
// *(trong tập tin app/services/contact.service.js) sử dụng các API
// * của thư viện mongodb để thực hiện các thao tác với CSDL MongoDB:


const { ObjectId  } = require("mongodb");

class ContactService {
    constructor(client) {
        // Colection contacs in mongodb
        this.Contact = client.db().collection('contacts');
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {

        // Dữ liệu phía dưới là các giá trị trong colection contacts
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        // Xóa các trường có giá trị là undefined
        Object.keys(contact).forEach((key) => {
                contact[key] === undefined && delete contact[key];
            } 
        );

        return contact;
    }
    // Đổ dữ liệu xuống mongoDB khi người dùng thêm liên hệ mới
    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: 'after', upsert: true }
        );
        return result.value;
    }

    // find và findByName 2 method phục vụ chức năng xử lý tìm tất cả
    // liên hệ có trong mongodb
    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
    // Trong đoạn code của phương thức findByName(name), ta dùng biểu thức chính quy không phân
    // biệt hoa thường ($option: "i") để so khớp tên contact cần tìm kiếm.
    // Tên contact ở đây là tên của csdl
    // Tìm tên xong rồi lấy tất cả colection của csdl đó 

    // method này sẽ xử lý chức năng tìm một liên hệ trong csdl liên hệ
    // Nhận id là giá trị duy nhất để tìm kiếm 
    // Trong mongoDB là _id được tạo mặc nhiên
    async findById(id) {
        console.log(ObjectId.isValid(id));
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Tìm kiếm theo id và tiến hành cập nhật liên hệ 
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.value;
    }

    //contactService.delete(id) tìm kiếm tài liệu theo Id và xóa tài liệu này.
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    //contactService.deleteMany() xóa tất các các đối tượng trong collection.
    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

    // Tìm tất cả liên hệ được yêu thích
    async findFavorite() {
        return await this.find({ favorite: true });
    }
}
module.exports = ContactService;

// * Lời gọi contactService.create() lưu thông tin đối tượng contact xuống CSDL. Phương thức create()
// * được định nghĩa trong lớp ContactService (app/services/contact.service.js) như sau:
