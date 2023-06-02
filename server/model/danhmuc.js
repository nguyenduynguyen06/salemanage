import connection from '../common/connect.js';

class DanhMuc {
  constructor(danhmuc) {
    this.id = danhmuc.id;
    this.ten_danh_muc = danhmuc.ten_danh_muc;
    this.anh_dai_dien = danhmuc.anh_dai_dien;
    this.ten_xe = danhmuc.ten_xe;
    this.gia = danhmuc.gia;
    this.id_danh_muc_xe = danhmuc.id_danh_muc_xe;
  }

  static getAll(callback) {

    connection.query("SELECT * FROM danh_muc_xe", (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  static getAllIdDanhMuc(id, callback) {

    connection.query("SELECT xe.id, xe.ten_xe, xe.gia, xe.mau, xe.mota, anh_xe.lien_ket_anh FROM xe JOIN danh_muc_xe ON xe.id_danh_muc_xe = danh_muc_xe.id JOIN (SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe) AS anh_xe ON xe.id = anh_xe.id_xe WHERE danh_muc_xe.id = ?", id, (err, danhmuc) => {
      if (err) {
        callback(null);
      } else {
        callback(danhmuc);
      }
    });
  }
}

class DanhMucProxy {
  static getAll(callback) {
    DanhMuc.getAll((results) => {
      callback(results);
    });
  }
  static getAllIdDanhMuc(id, callback) {
    DanhMuc.getAllIdDanhMuc(id, (danhmuc) => {
    
      callback(danhmuc);
    });
  }
}

export { DanhMuc, DanhMucProxy };
class DanhMuc1 {
  constructor(danhMuc) {
    this.id = danhMuc.id;
    this.ten_danh_muc = danhMuc.ten_danh_muc;
    this.anh_dai_dien = danhMuc.anh_dai_dien;
    // ...
  }

  static addDanhMuc(danhMucData, callback) {
    const { ten_danh_muc, anh_dai_dien } = danhMucData;
  

    const imagePath = `${anh_dai_dien}`;
  
    const query = 'INSERT INTO danh_muc_xe (ten_danh_muc, anh_dai_dien) VALUES (?, ?)';
    connection.query(query, [ten_danh_muc, imagePath], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const danhMuc = new DanhMuc1({
          id: result.insertId,
          ten_danh_muc: ten_danh_muc,
          anh_dai_dien: imagePath,
        });
        callback(null, danhMuc);
      }
    });
  }
  static deleteDanhMuc(id, callback) {
    const query = 'DELETE FROM danh_muc_xe WHERE id = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.affectedRows > 0);
      }
    });
  }
  // ...
}

class DanhMucAdapter {
  addDanhMuc(danhMucData, callback) {
    DanhMuc1.addDanhMuc(danhMucData, (err, danhMuc) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, danhMuc);
      }
    });
  }
  deleteDanhMuc(id, callback) {
    DanhMuc1.deleteDanhMuc(id, (err, isDeleted) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, isDeleted);
      }
    });
  }
}

export { DanhMuc1, DanhMucAdapter };

