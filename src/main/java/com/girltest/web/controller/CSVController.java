package com.girltest.web.controller;

import com.girltest.bean.Student;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by huangweii on 2016/1/14.
 */
@Controller
public class CSVController {

    /**
     * 把字符串转成utf8编码，保证中文文件名不会乱码
     *
     * @param s
     * @return
     */
    public static String toUtf8String(String s) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= 0 && c <= 255) {
                sb.append(c);
            } else {
                byte[] b;
                try {
                    b = Character.toString(c).getBytes("utf-8");
                } catch (Exception ex) {
                    b = new byte[0];
                }
                for (int j = 0; j < b.length; j++) {
                    int k = b[j];
                    if (k < 0)
                        k += 256;
                    sb.append("%" + Integer.toHexString(k).toUpperCase());
                }
            }
        }
        return sb.toString();
    }

    @RequestMapping("/export")
    public String exportCSV(HttpServletRequest request, HttpServletResponse response, String name1) throws IOException {

        System.out.println("name1:" + name1);
        SimpleDateFormat csvsdf = new SimpleDateFormat("yyyyMMddH24mmss");
        // 报表文件名
        String FileName = "短信清单_" + csvsdf.format(new Date()) + ".csv";
        FileName = toUtf8String(FileName);
        // FileName = "你好.csv"; //default file name
        // 记录类型
        // sets the data to be exported
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        int id = 0;
        String name = null;
        int age = 0;
        String birthday = null;
        String strOut = "";

        // ***** Output strOut to Response ******
        response.reset(); // Reset the response
        response.setContentType("application/octet-stream;charset=GB2312"); // the
        // encoding
        // of
        // this
        // example
        // is
        // GB2312
        response.setHeader("Content-Disposition", "attachment; filename=\""
                + FileName + "\"");

        PrintWriter out = null;
        try {
            out = response.getWriter();
            List<Student> list = null;
            try {
                list = getStudent();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            strOut = "\"" + "ID" + "\"" + ",\"" + "姓名" + "\"" + ",\"" + "年龄"
                    + "\"" + ",\"" + "生日" + "\"\n";
            // Exporting vector to csv file
            // String strOut = "";
            Long rowCount = 0l;// 记录行数
            long s = 0l;
            Date start = new Date();
            s = start.getTime();
            for (int i = 0; i < list.size(); i++) {
                Student student = list.get(i);
                id = student.getId();
                strOut += "\"" + id + "\"";
                name = getQjString(student.getName());
                strOut += ",\"" + name + "\"";
                age = student.getAge();
                strOut += ",\"" + age + "\"";
                birthday = df.format(student.getBirthday());
                strOut += ",\"" + birthday + "\"";
                strOut += "\n";
                rowCount++;
                if (rowCount % 100 == 0) {
                    // 写文件
                    out.write(strOut);
                    strOut = "";
                }
            }
            if (rowCount < 1000000) {
                // 写文件
                out.write(strOut);
            }
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null)
                try {
                    out.close();
                } catch (Exception e) {
                }
        }
        return null;
    }

    /**
     * @作者：heasen
     * @日期：2010-3-24
     * @功能：手工构建一个简单格式的Excel
     */
    private List<Student> getStudent() throws Exception {
        List list = new ArrayList();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");

        Student user1 = new Student(1, "张三", 16, df.parse("1997-03-12"));
        Student user2 = new Student(2, "李四", 17, df.parse("1996-08-12"));
        Student user3 = new Student(3, "王五", 26, df.parse("1985-11-12"));
        list.add(user1);
        list.add(user2);
        list.add(user3);

        return list;
    }

    /**
     * csv文件转换一个双引号替换成两个双引号
     *
     * @param parameter
     * @return
     */
    public String getQjString(String parameter) {
        if (parameter == null || "".equals(parameter)) {
            return "";
        }
        parameter = parameter.replaceAll("\"", "\"\"");// 双引号
        return parameter;
    }
}
