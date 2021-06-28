
import { useEffect, useState } from "react";


export const Actions = () => {
  let [users, setUsers] = useState([]);

    //userLength is for showing the Data Loading message.
  let [userLength, setUserLength] = useState(null);

  let [loginUser , setLoginUser] = useState([])

  let [products, setProducts] = useState([]);

  let [productLength, setProductLength] = useState(null);

  let [reports, setReports] = useState([]);

  let [reportLength, setReportLength] = useState(null);

  let [salesorders, setSalesorders] = useState([])

  let [salesordersLength, setSalesorderLength] = useState(null);

  let [customers, setCustomers] = useState([]);

  let [customerLength, setCustomerLength] = useState(null);

  let [orderdetails, setOrderdetail] = useState([]);

  let [orderdetailLength, setOrderdetailLength] = useState(null);


  useEffect(() => {
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost/php-react/all-products.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
          setProductLength(true);
        } else {
          setProductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      fetch("http://localhost/php-react/all-reports.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setReports(data.reports);
          setReportLength(true);
        } else {
          setReportLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      fetch("http://localhost/php-react/all-salesorders.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSalesorders(data.salesorders);
          setSalesorderLength(true);
        } else {
          setSalesorderLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      fetch("http://localhost/php-react/all-customers.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setCustomers(data.customers);
          setCustomerLength(true);
        } else {
          setCustomerLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      fetch("http://localhost/php-react/all-orderdetails.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setOrderdetail(data.orderdetails);
          setOrderdetailLength(true);
        } else {
          setOrderdetailLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
      // filter outing the user.
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // login a user.
  const userLogin = (addLoginUser) => {
    fetch("http://localhost/php-react/login-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addLoginUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setLoginUser(data.id); 

        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Inserting a new user into the database.
  const insertProduct = (newProduct) => {
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
          setProducts([
            {
              ...newProduct,
            },
            ...products,
          ]);
          setProductLength(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const ProducteditMode = (id) => {
    products = products.map((product) => {
      if (product.Product_ID === id) {
        product.isEditing = true;
        return product;
      }
      product.isEditing = false;
      return product;
    });
    setProducts(products);
  };

  // Cance the edit mode.
  const ProductcancelEdit = (id) => {
    products = products.map((product) => {
      if (product.Product_ID === id) {
        product.isEditing = false;
        return product;
      }
      return product;
    });
    setProducts(products);
  };

  // Updating a user.
  const updateProduct = (productData) => {
    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          products = products.map((product) => {
            if (product.Product_ID === productData.Product_ID) {
              product.isEditing = false;
              product.Product_Name = productData.Product_Name;
              product.Product_UnitPrice = productData.Product_UnitPrice;
              product.Product_Cost = productData.Product_Cost;
              return product;
            }
            return product;
          });
          setProducts(products);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteProduct = (theID) => {
      // filter outing the user.
    let productDeleted = products.filter((product) => {
      return product.Product_ID !== theID;
    });
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProducts(productDeleted);
          if (products.length === 1) {
            setProductLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSalesorder = (theID) => {
    // filter outing the user.
  let salesorderDeleted = salesorders.filter((salesorder) => {
    return salesorder.OrderId !== theID;
  });
  fetch("http://localhost/php-react/delete-salesorder.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: theID }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setSalesorders(salesorderDeleted);
        if (salesorders.length === 1) {
          setSalesorderLength(0);
        }
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteOrderdetail = (theID) => {
  // filter outing the user.
let orderdetailDeleted = orderdetails.filter((orderdetail) => {
  return orderdetail.OrderId !== theID;
});
fetch("http://localhost/php-react/delete-orderdetail.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: theID }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.success) {
      setOrderdetail(orderdetailDeleted);
      if (orderdetails.length === 1) {
        setOrderdetailLength(0);
      }
    } else {
      alert(data.msg);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

const SalesordereditMode = (id) => {
  salesorders = salesorders.map((salesorder) => {
    if (salesorder.seq === id) {
      salesorder.isEditing = true;
      return salesorder;
    }
    salesorder.isEditing = false;
    return salesorder;
  });
  setSalesorders(salesorders);
};

// Cance the edit mode.
const SalesordercancelEdit = (id) => {
  salesorders = salesorders.map((salesorder) => {
    if (salesorder.seq === id) {
      salesorder.isEditing = false;
      return salesorder;
    }
    return salesorder;
  });
  setSalesorders(salesorders);
};

// Updating a user.
const updateSalesorder = (salesorderData) => {
  fetch("http://localhost/php-react/update-salesorder.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salesorderData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        salesorders = salesorders.map((salesorder) => {
          if (salesorder.seq === salesorderData.seq) {
            salesorder.isEditing = false;
            salesorder.OrderId = salesorderData.OrderId;
            salesorder.EmpId = salesorderData.EmpId;
            salesorder.CustId = salesorderData.CustId;
            salesorder.OrderDate = salesorderData.OrderDate;
            salesorder.Descript = salesorderData.Descript;
            return salesorder;
          }
          return salesorder;
        });
        setSalesorders(salesorders);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const OrderdetaileditMode = (id) => {
  orderdetails = orderdetails.map((orderdetail) => {
    if (orderdetail.seq === id) {
      orderdetail.isEditing = true;
      return orderdetail;
    }
    orderdetail.isEditing = false;
    return orderdetail;
  });
  setOrderdetail(orderdetails);
};

// Cance the edit mode.
const OrderdetailcancelEdit = (id) => {
  orderdetails = orderdetails.map((orderdetail) => {
    if (orderdetail.seq === id) {
      orderdetail.isEditing = false;
      return orderdetail;
    }
    return orderdetail;
  });
  setOrderdetail(orderdetails);
};

// Updating a user.
const updateOrderdetail = (orderdetailData) => {
  fetch("http://localhost/php-react/update-orderdetail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderdetailData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        orderdetails = orderdetails.map((orderdetail) => {
          if (orderdetail.seq === orderdetailData.seq) {
            orderdetail.isEditing = false;
            orderdetail.ProdId = orderdetailData.ProdId;
            orderdetail.Qty = orderdetailData.Qty;
            orderdetail.Discount = orderdetailData.Discount;
            return orderdetail;
          }
          return orderdetail;
        });
        setOrderdetail(orderdetails);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const insertSalesorder = (newSalesorder) => {
  fetch("http://localhost/php-react/add-salesorder.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSalesorder),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.id) {
        setSalesorders([
          {
            id: data.id,
            ...newSalesorder,
          },
          ...salesorders,
        ]);
        setSalesorderLength(true);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const insertOrderdetail = (newOrderdetail) => {
  fetch("http://localhost/php-react/add-orderdetail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrderdetail),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.id) {
        setOrderdetail([
          {
            id: data.id,
            ...newOrderdetail,
          },
          ...orderdetails,
        ]);
        setOrderdetailLength(true);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteOrderdetailseq = (theID) => {
  // filter outing the user.
let orderdetailDeleted = orderdetails.filter((orderdetail) => {
  return orderdetail.OrderId !== theID;
});
fetch("http://localhost/php-react/delete-orderdetail-seq.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: theID }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.success) {
      setOrderdetail(orderdetailDeleted);
      if (orderdetails.length === 1) {
        setOrderdetailLength(0);
      }
    } else {
      alert(data.msg);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

  return {
    users,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
    userLogin,
    loginUser,
    products,
    ProducteditMode,
    ProductcancelEdit,
    updateProduct,
    insertProduct,
    deleteProduct,
    productLength,
    reports,
    reportLength,
    salesorders,
    salesordersLength,
    deleteSalesorder,
    customers,
    customerLength,
    orderdetails,
    orderdetailLength,
    deleteOrderdetail,
    SalesordereditMode,
    SalesordercancelEdit,
    updateSalesorder,
    OrderdetaileditMode,
    OrderdetailcancelEdit,
    updateOrderdetail,
    insertSalesorder,
    insertOrderdetail,
    deleteOrderdetailseq,
  };
};