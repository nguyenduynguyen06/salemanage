import connection from '../common/connect.js';

class HangXe {
  constructor(hangxe) {
    this.id = hangxe.id;
    this.ten_hang_xe = hangxe.ten_hang_xe;
    this.logo = hangxe.logo;
    this.ten_xe = hangxe.ten_xe;
    this.gia = hangxe.gia;
    this.id_danh_muc_xe = hangxe.id_danh_muc_xe;
  }

  static getAll(callback) {
    connection.query("SELECT * FROM hang_xe", (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  static getAllIdHangXe(id, callback) {
    connection.query("SELECT xe.id, xe.ten_xe, xe.gia, xe.mau, xe.mota, anh_xe.lien_ket_anh FROM xe JOIN hang_xe ON xe.id_hang_xe = hang_xe.id JOIN (SELECT id_xe, lien_ket_anh FROM anh_xe GROUP BY id_xe) AS anh_xe ON xe.id = anh_xe.id_xe WHERE hang_xe.id = ?", id, (err, hangxe) => {
      if (err) {
        callback(null);
      } else {
        callback(hangxe);
      }
    });
  }
}

class HangXeProxy {
  static getAll(callback) {
    HangXe.getAll((results) => {
      callback(results);
    });
  }
  static getAllIdHangXe(id, callback) {
    HangXe.getAllIdHangXe(id, (hangxe) => {
      callback(hangxe);
    });
  }
}

export { HangXe, HangXeProxy };
