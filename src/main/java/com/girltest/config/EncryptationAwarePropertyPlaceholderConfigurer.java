package com.girltest.config;

import com.common.util.SystemHWUtil;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

/**
 * Created by 黄威 on 10/8/16.<br >
 */
public class EncryptationAwarePropertyPlaceholderConfigurer extends PropertyPlaceholderConfigurer {
    public static final String desKey="";
    @Override
    protected String convertPropertyValue(String originalValue) {
        if (originalValue.startsWith("{DES}")) {
            return decrypt(originalValue.substring(5));
        }
        return originalValue;
    }

    private String decrypt(String value) {
        try {
            String base64= SystemHWUtil.decryptDES(value,desKey);
            return new String(SystemHWUtil.decodeBase64(base64),SystemHWUtil.CHARSET_UTF);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
